function initAdminMode(galleryApi) {
  const shell = document.getElementById("admin-shell");
  const closeBtn = document.getElementById("admin-close");
  const loginPanel = document.getElementById("admin-login-panel");
  const githubPanel = document.getElementById("admin-github-panel");
  const githubForm = document.getElementById("admin-github-form");
  const githubTokenInput = document.getElementById("admin-github-token");
  const githubOwnerInput = document.getElementById("admin-github-owner");
  const githubRepoInput = document.getElementById("admin-github-repo");
  const githubBranchInput = document.getElementById("admin-github-branch");
  const workPanel = document.getElementById("admin-work-panel");
  const loginForm = document.getElementById("admin-login-form");
  const passwordInput = document.getElementById("admin-password");
  const uploadForm = document.getElementById("admin-upload-form");
  const srcInput = document.getElementById("admin-src-path");
  const fileInput = document.getElementById("admin-image-file");
  const altInput = document.getElementById("admin-alt");
  const categoryInput = document.getElementById("admin-category");
  const moodInput = document.getElementById("admin-mood");
  const spanInput = document.getElementById("admin-span");
  const status = document.getElementById("admin-status");
  const list = document.getElementById("admin-gallery-list");
  const replaceInput = document.getElementById("admin-replace-file");
  const refreshButton = document.getElementById("admin-refresh-gallery");
  const logoutButton = document.getElementById("admin-logout");

  if (
    !shell ||
    !closeBtn ||
    !loginPanel ||
    !githubPanel ||
    !(githubForm instanceof HTMLFormElement) ||
    !(githubTokenInput instanceof HTMLInputElement) ||
    !(githubOwnerInput instanceof HTMLInputElement) ||
    !(githubRepoInput instanceof HTMLInputElement) ||
    !(githubBranchInput instanceof HTMLInputElement) ||
    !workPanel ||
    !(loginForm instanceof HTMLFormElement) ||
    !(uploadForm instanceof HTMLFormElement) ||
    !(passwordInput instanceof HTMLInputElement) ||
    !(srcInput instanceof HTMLInputElement) ||
    !(fileInput instanceof HTMLInputElement) ||
    !(altInput instanceof HTMLInputElement) ||
    !(categoryInput instanceof HTMLSelectElement) ||
    !(moodInput instanceof HTMLSelectElement) ||
    !(spanInput instanceof HTMLInputElement) ||
    !status ||
    !list ||
    !(replaceInput instanceof HTMLInputElement) ||
    !(refreshButton instanceof HTMLButtonElement) ||
    !(logoutButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  let replaceIndex = null;
  let typedSecret = "";
  let secretTimeoutId = null;
  let repoContext = null;
  let busy = false;

  const setStatus = (message, type = "neutral") => {
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (type === "success") {
      status.classList.add("is-success");
    }
    if (type === "error") {
      status.classList.add("is-error");
    }
  };

  const setBusy = (value) => {
    busy = value;
    uploadForm.querySelectorAll("button").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = value;
      }
    });
    list.querySelectorAll("button").forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.disabled = value;
      }
    });
    refreshButton.disabled = value;
    logoutButton.disabled = value;
  };

  const toBase64FromBytes = (bytes) => {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  };

  const toBase64FromText = (value) => {
    const bytes = new TextEncoder().encode(value);
    return toBase64FromBytes(bytes);
  };

  const fromBase64ToText = (value) => {
    const normalized = value.replace(/\s+/g, "");
    const binary = window.atob(normalized);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const getRepoContext = () => ({
    token: githubTokenInput.value.trim(),
    owner: githubOwnerInput.value.trim() || ADMIN_DEFAULT_REPO_OWNER,
    repo: githubRepoInput.value.trim() || ADMIN_DEFAULT_REPO_NAME,
    branch: githubBranchInput.value.trim() || ADMIN_DEFAULT_REPO_BRANCH
  });

  const setRepoConnectedState = (connected) => {
    githubPanel.hidden = connected;
    workPanel.hidden = !connected;
  };

  const runAdminAction = async (action) => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  const githubApiRequest = async (path, context, options = {}) => {
    const method = options.method == null ? "GET" : options.method;
    const encodedPath = path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    const url = new URL(`https://api.github.com/repos/${context.owner}/${context.repo}/contents/${encodedPath}`);
    const includeRef = options.includeRef == null ? method === "GET" : options.includeRef;
    if (includeRef) {
      url.searchParams.set("ref", context.branch);
    }

    const response = await window.fetch(url.toString(), {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${context.token}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail =
        payload && typeof payload.message === "string" && payload.message
          ? payload.message
          : `GitHub request failed (${response.status}).`;
      throw new Error(detail);
    }

    return payload;
  };

  const parseGalleryDataText = (rawText) => {
    const match = rawText.match(/window\.SITE_GALLERY_ITEMS\s*=\s*(\[[\s\S]*\]);/);
    if (!match || !match[1]) {
      throw new Error("Could not parse gallery-data.js from repository.");
    }

    return normalizeGalleryItems(JSON.parse(match[1]));
  };

  const buildGalleryDataText = (items) => {
    const normalized = normalizeGalleryItems(items);
    return [
      "// Auto-generated gallery data.",
      "// This file can be replaced later by running process-images.command.",
      `window.SITE_GALLERY_ITEMS = ${JSON.stringify(normalized, null, 2)};`,
      ""
    ].join("\n");
  };

  const fetchGalleryFile = async (context) => {
    const payload = await githubApiRequest(ADMIN_GALLERY_DATA_PATH, context);
    if (!payload || typeof payload.content !== "string" || typeof payload.sha !== "string") {
      throw new Error("Could not read gallery-data.js from GitHub.");
    }

    const text = fromBase64ToText(payload.content);
    return {
      sha: payload.sha,
      items: parseGalleryDataText(text)
    };
  };

  const writeRepoFile = async (context, path, contentBase64, message, sha = undefined) => {
    const body = {
      message,
      content: contentBase64,
      branch: context.branch
    };
    if (sha) {
      body.sha = sha;
    }

    return githubApiRequest(path, context, { method: "PUT", body });
  };

  const readRepoFileSha = async (context, path) => {
    const payload = await githubApiRequest(path, context, { method: "GET", includeRef: true });
    if (!payload || typeof payload.sha !== "string") {
      throw new Error(`Could not read file SHA for ${path}.`);
    }
    return payload.sha;
  };

  const deleteRepoFile = async (context, path, message) => {
    let sha;
    try {
      sha = await readRepoFileSha(context, path);
    } catch (error) {
      return;
    }

    await githubApiRequest(path, context, {
      method: "DELETE",
      includeRef: false,
      body: {
        message,
        sha,
        branch: context.branch
      }
    });
  };

  const commitGalleryItems = async (context, items, message) => {
    const normalized = normalizeGalleryItems(items);
    const latest = await fetchGalleryFile(context);
    await writeRepoFile(
      context,
      ADMIN_GALLERY_DATA_PATH,
      toBase64FromText(buildGalleryDataText(normalized)),
      message,
      latest.sha
    );
    galleryItems = normalized;
  };

  const syncGalleryFromRepo = async (context) => {
    const latest = await fetchGalleryFile(context);
    galleryItems = latest.items;
    galleryApi.refresh();
    renderAdminList();
  };

  const slugifyName = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 42) || "image";

  const getFileExtension = (file) => {
    const nameParts = file.name.split(".");
    const finalNamePart = nameParts.pop();
    const fromName = finalNamePart ? finalNamePart.toLowerCase() : "";
    if (fromName && fromName.length <= 6) {
      return fromName;
    }
    if (file.type === "image/jpeg") {
      return "jpg";
    }
    if (file.type === "image/png") {
      return "png";
    }
    if (file.type === "image/webp") {
      return "webp";
    }
    return "bin";
  };

  const readFileBytes = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const populateSelect = (select, values) => {
    select.innerHTML = "";
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  };

  populateSelect(categoryInput, ADMIN_ALLOWED_CATEGORIES);
  populateSelect(moodInput, ADMIN_ALLOWED_MOODS);

  const isAuthenticated = () => {
    try {
      return window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  };

  const setAuthenticated = (value) => {
    try {
      if (value) {
        window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "1");
      } else {
        window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
      }
    } catch (error) {
      // Ignore storage failures so the rest of the page still works.
    }
  };

  const closeAdmin = () => {
    shell.hidden = true;
    shell.setAttribute("aria-hidden", "true");
    document.body.classList.remove("admin-open");
    replaceIndex = null;
    replaceInput.value = "";
  };

  const openAdmin = () => {
    shell.hidden = false;
    shell.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-open");

    githubOwnerInput.value = githubOwnerInput.value || ADMIN_DEFAULT_REPO_OWNER;
    githubRepoInput.value = githubRepoInput.value || ADMIN_DEFAULT_REPO_NAME;
    githubBranchInput.value = githubBranchInput.value || ADMIN_DEFAULT_REPO_BRANCH;

    try {
      const savedToken = window.localStorage.getItem(ADMIN_GITHUB_TOKEN_STORAGE_KEY);
      if (savedToken && !githubTokenInput.value) {
        githubTokenInput.value = savedToken;
      }
    } catch (error) {
      // Ignore unavailable storage.
    }

    if (isAuthenticated()) {
      loginPanel.hidden = true;
      setRepoConnectedState(Boolean(repoContext));
      if (repoContext) {
        renderAdminList();
        setStatus("Panel unlocked and connected to GitHub.", "success");
      } else {
        setStatus("Panel unlocked. Connect GitHub to edit live files.");
      }
      return;
    }

    loginPanel.hidden = false;
    githubPanel.hidden = true;
    workPanel.hidden = true;
    setStatus("Enter access key to unlock image controls.");
    passwordInput.value = "";
    passwordInput.focus();
  };

  const renderAdminList = () => {
    list.innerHTML = "";

    if (!galleryItems.length) {
      const empty = document.createElement("p");
      empty.textContent = "No gallery images are currently loaded.";
      list.appendChild(empty);
      return;
    }

    galleryItems.forEach((item, index) => {
      const row = document.createElement("article");
      row.className = "admin-gallery-row";

      const preview = document.createElement("img");
      preview.src = item.src;
      preview.alt = item.alt;
      preview.loading = "lazy";
      preview.decoding = "async";
      preview.className = "admin-thumb";

      const meta = document.createElement("div");
      meta.className = "admin-gallery-meta";

      const details = document.createElement("p");
      details.textContent = `${index + 1}. ${item.mood} / ${item.category} / span ${item.span}`;

      const caption = document.createElement("p");
      caption.textContent = item.alt;

      meta.append(details, caption);

      const actions = document.createElement("div");
      actions.className = "admin-gallery-actions";

      const replaceButton = document.createElement("button");
      replaceButton.type = "button";
      replaceButton.className = "btn btn-secondary";
      replaceButton.textContent = "Replace";
      replaceButton.addEventListener("click", () => {
        replaceIndex = index;
        replaceInput.click();
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "btn btn-secondary";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        if (!repoContext) {
          setStatus("Connect GitHub first.", "error");
          return;
        }

        runAdminAction(async () => {
          const nextItems = [...galleryItems];
          const removedItem = nextItems[index];
          nextItems.splice(index, 1);

          const removedPath = removedItem && removedItem.src ? removedItem.src : "";
          if (
            typeof removedPath === "string" &&
            removedPath.startsWith("assets/images/web/gallery-") &&
            !nextItems.some((item) => item.src === removedPath)
          ) {
            await deleteRepoFile(repoContext, removedPath, `remove image file ${removedPath}`);
          }

          await commitGalleryItems(repoContext, nextItems, "remove gallery image");
          galleryApi.refresh();
          renderAdminList();
          setStatus("Image removed and pushed to GitHub.", "success");
        }).catch((error) => {
          setStatus(error.message, "error");
        });
      });

      actions.append(replaceButton, removeButton);
      row.append(preview, meta, actions);
      list.appendChild(row);
    });
  };

  const hashText = async (value) => {
    if (!window.crypto || !window.crypto.subtle) {
      return null;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const candidate = passwordInput.value.trim();

    if (!candidate) {
      setStatus("Password is required.", "error");
      return;
    }

    setStatus("Checking password...");

    let digest = null;
    try {
      digest = await hashText(candidate);
    } catch (error) {
      setStatus("Could not verify password. Please try again.", "error");
      return;
    }
    if (!digest) {
      setStatus("This browser does not support secure admin login checks.", "error");
      return;
    }
    if (digest !== ADMIN_PASSWORD_HASH) {
      setStatus("Incorrect password.", "error");
      return;
    }

    setAuthenticated(true);
    loginPanel.hidden = true;
    setRepoConnectedState(Boolean(repoContext));
    setStatus("Panel unlocked. Connect GitHub to apply live changes.", "success");
  });

  githubForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runAdminAction(async () => {
      const nextContext = getRepoContext();
      if (!nextContext.token) {
        setStatus("GitHub token is required.", "error");
        return;
      }

      await syncGalleryFromRepo(nextContext);
      repoContext = nextContext;
      try {
        window.localStorage.setItem(ADMIN_GITHUB_TOKEN_STORAGE_KEY, nextContext.token);
      } catch (error) {
        // Ignore storage failures.
      }

      setRepoConnectedState(true);
      setStatus(
        `Connected to ${nextContext.owner}/${nextContext.repo} (${nextContext.branch}). Live edits are enabled.`,
        "success"
      );
      altInput.focus();
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  uploadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    runAdminAction(async () => {
      const selectedFile = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
      let src = srcInput.value.trim();

      if (!src && !selectedFile) {
        setStatus("Add an image file or an image path.", "error");
        return;
      }

      if (selectedFile) {
        if (selectedFile.size > 18 * 1024 * 1024) {
          setStatus("Image file is too large. Keep files below 18MB.", "error");
          return;
        }

        const extension = getFileExtension(selectedFile);
        const name = selectedFile.name.replace(/\.[^.]+$/, "");
        const path = `assets/images/web/gallery-${Date.now()}-${slugifyName(name)}.${extension}`;
        const fileBytes = await readFileBytes(selectedFile);
        await writeRepoFile(
          repoContext,
          path,
          toBase64FromBytes(fileBytes),
          `upload ${selectedFile.name}`
        );
        src = path;
      }

      const nextItem = normalizeGalleryItem({
        src,
        alt: altInput.value,
        category: categoryInput.value,
        mood: moodInput.value,
        span: spanInput.value
      });

      if (!nextItem) {
        setStatus("Invalid image data. Please try a different file or path.", "error");
        return;
      }

      const nextItems = [...galleryItems, nextItem];
      await commitGalleryItems(repoContext, nextItems, "add gallery image");

      uploadForm.reset();
      spanInput.value = "36";
      galleryApi.refresh();
      renderAdminList();
      setStatus("Image uploaded and pushed live to GitHub.", "success");
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  replaceInput.addEventListener("change", async () => {
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    const selectedFile = replaceInput.files && replaceInput.files[0] ? replaceInput.files[0] : null;
    if (replaceIndex === null || !selectedFile) {
      return;
    }

    runAdminAction(async () => {
      if (selectedFile.size > 18 * 1024 * 1024) {
        setStatus("Replacement file is too large. Keep files below 18MB.", "error");
        return;
      }

      const nextItems = [...galleryItems];
      const existing = nextItems[replaceIndex];
      if (!existing) {
        return;
      }

      const currentSrc = existing.src;
      const canOverwriteExisting =
        currentSrc.startsWith("assets/") && !currentSrc.startsWith("assets/images/web/gallery-");
      const extension = getFileExtension(selectedFile);
      const name = selectedFile.name.replace(/\.[^.]+$/, "");
      const uploadPath = canOverwriteExisting
        ? currentSrc
        : `assets/images/web/gallery-${Date.now()}-${slugifyName(name)}.${extension}`;
      const fileBytes = await readFileBytes(selectedFile);

      let existingSha;
      if (canOverwriteExisting) {
        try {
          const existingPayload = await githubApiRequest(uploadPath, repoContext);
          if (existingPayload && typeof existingPayload.sha === "string") {
            existingSha = existingPayload.sha;
          }
        } catch (error) {
          existingSha = undefined;
        }
      }

      await writeRepoFile(
        repoContext,
        uploadPath,
        toBase64FromBytes(fileBytes),
        `replace image ${uploadPath}`,
        existingSha
      );

      nextItems[replaceIndex] =
        normalizeGalleryItem(Object.assign({}, existing, { src: uploadPath })) || existing;
      await commitGalleryItems(repoContext, nextItems, "update gallery after replace");

      if (
        currentSrc.startsWith("assets/images/web/gallery-") &&
        currentSrc !== uploadPath &&
        !nextItems.some((item, itemIndex) => itemIndex !== replaceIndex && item.src === currentSrc)
      ) {
        await deleteRepoFile(repoContext, currentSrc, `remove replaced image file ${currentSrc}`);
      }

      replaceInput.value = "";
      replaceIndex = null;
      galleryApi.refresh();
      renderAdminList();
      setStatus("Image replaced and pushed live to GitHub.", "success");
    }).catch((error) => {
      replaceInput.value = "";
      replaceIndex = null;
      setStatus(error.message, "error");
    });
  });

  refreshButton.addEventListener("click", () => {
    if (!repoContext) {
      setStatus("Connect GitHub first.", "error");
      return;
    }

    runAdminAction(async () => {
      await syncGalleryFromRepo(repoContext);
      setStatus("Gallery refreshed from GitHub.", "success");
    }).catch((error) => {
      setStatus(error.message, "error");
    });
  });

  logoutButton.addEventListener("click", () => {
    setAuthenticated(false);
    repoContext = null;
    workPanel.hidden = true;
    githubPanel.hidden = true;
    loginPanel.hidden = false;
    passwordInput.value = "";
    setStatus("Panel locked.");
    passwordInput.focus();
  });

  shell.addEventListener("click", (event) => {
    if ((event.target instanceof HTMLElement) && event.target.dataset.adminClose === "true") {
      closeAdmin();
    }
  });

  closeBtn.addEventListener("click", closeAdmin);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !shell.hidden) {
      closeAdmin();
      return;
    }

    if (shell.hidden && !event.ctrlKey && !event.metaKey && !event.altKey && event.key.length === 1) {
      typedSecret = `${typedSecret}${event.key.toLowerCase()}`.slice(-12);

      if (secretTimeoutId) {
        window.clearTimeout(secretTimeoutId);
      }

      secretTimeoutId = window.setTimeout(() => {
        typedSecret = "";
      }, 1200);

      if (typedSecret.endsWith("libraryedit")) {
        openAdmin();
      }
    }
  });

  if (window.location.hash === "#library") {
    openAdmin();
  }
}

