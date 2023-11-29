(function () {
  const firstRowKeysFk = [
    { primary: "`", secondary: "~" },
    { primary: "1", secondary: "!" },
    { primary: "2", secondary: "@" },
    { primary: "3", secondary: "#" },
    { primary: "4", secondary: "$" },
    { primary: "5", secondary: "%" },
    { primary: "6", secondary: "^" },
    { primary: "7", secondary: "&" },
    { primary: "8", secondary: "*" },
    { primary: "9", secondary: "(" },
    { primary: "0", secondary: ")" },
    { primary: "-", secondary: "_" },
    { primary: "=", secondary: "+" },
    { primary: "Backspace", secondary: "" },
  ];

  const secondRowKeysFk = [
    { primary: "Tab", secondary: "" },
    { primary: "q", secondary: "" },
    { primary: "w", secondary: "" },
    { primary: "e", secondary: "" },
    { primary: "r", secondary: "" },
    { primary: "t", secondary: "" },
    { primary: "y", secondary: "" },
    { primary: "u", secondary: "" },
    { primary: "i", secondary: "" },
    { primary: "o", secondary: "" },
    { primary: "p", secondary: "" },
    { primary: "[", secondary: "{" },
    { primary: "]", secondary: "}" },
    { primary: "\\", secondary: "|" },
    { primary: "Del", secondary: "" },
  ];

  const thirdRowKeysFk = [
    { primary: "Caps", secondary: "" },
    { primary: "a", secondary: "" },
    { primary: "s", secondary: "" },
    { primary: "d", secondary: "" },
    { primary: "f", secondary: "" },
    { primary: "g", secondary: "" },
    { primary: "h", secondary: "" },
    { primary: "j", secondary: "" },
    { primary: "k", secondary: "" },
    { primary: "l", secondary: "" },
    { primary: ";", secondary: ":" },
    { primary: "'", secondary: '"' },
    { primary: "Enter", secondary: "" },
  ];

  const fourthRowKeysFk = [
    { primary: "Shift", secondary: "" },
    { primary: "z", secondary: "" },
    { primary: "x", secondary: "" },
    { primary: "c", secondary: "" },
    { primary: "v", secondary: "" },
    { primary: "b", secondary: "" },
    { primary: "n", secondary: "" },
    { primary: "m", secondary: "" },
    { primary: ",", secondary: "<" },
    { primary: ".", secondary: ">" },
    { primary: "/", secondary: "?" },
    { primary: "Shift", secondary: "" },
  ];

  const fifthRowKeysFk = [{ primary: "________", secondary: "" }];

  const numericKeyboardContainerNk = document.createElement("div");
  function createNumericKeyboard() {
    const numericKeyboardNk = document.createElement("div");
    makeKeyboardDraggable(numericKeyboardContainerNk);
    let keyboardRowNk = document.createElement("div");

    numericKeyboardContainerNk.id = "numeric-keyboard-container-nk";
    numericKeyboardNk.id = "numeric-keyboard-nk";

    keyboardRowNk.classList.add("keyboard-row-nk");

    document.body.append(numericKeyboardContainerNk);
    numericKeyboardContainerNk.append(numericKeyboardNk);
    numericKeyboardNk.append(keyboardRowNk);

    for (let i = 0; i < 9; i++) {
      const keysNk = document.createElement("div");
      keysNk.textContent = i + 1;
      keysNk.classList.add("keys-nk");

      if (i % 3 === 0) {
        keyboardRowNk = document.createElement("div");
        keyboardRowNk.classList.add("keyboard-row-nk");
        numericKeyboardNk.append(keyboardRowNk);
      }

      keyboardRowNk.append(keysNk);
    }

    keyboardRowNk = document.createElement("div");
    const keysNk0 = document.createElement("div");
    const keysNkDelete = document.createElement("div");

    keysNk0.textContent = "0";
    keysNkDelete.textContent = "Delete";

    keyboardRowNk.classList.add("keyboard-row-nk");
    keysNk0.classList.add("keys-nk");
    keysNkDelete.classList.add("keys-nk");

    numericKeyboardNk.append(keyboardRowNk);
    keyboardRowNk.append(keysNk0);
    keyboardRowNk.append(keysNkDelete);
  }

  const fullKeyboardContainer = document.createElement("div");
  function createFullKeyboardLayout(...rows) {
    document.body.append(fullKeyboardContainer);
    fullKeyboardContainer.id = "full-keyboard-container-fk";
    makeKeyboardDraggable(fullKeyboardContainer);

    rows.forEach((row, index) => {
      const keyboardRow = document.createElement("div");
      keyboardRow.classList.add("keyboard-row-fk");
      keyboardRow.id =
        index === 0
          ? "first-row-fk"
          : index === 1
          ? "second-row-fk"
          : index === 2
          ? "third-row-fk"
          : index === 3
          ? "fourth-row-fk"
          : "fifth-row-fk";

      fullKeyboardContainer.append(keyboardRow);
      row.forEach((keys) => {
        const primaryKey = document.createElement("div");
        const secondaryKey = document.createElement("div");
        const keyboardKeys = document.createElement("div");

        const keyboardKeysClasses = [
          "keys-fk",
          ...(keys.primary === "Shift" ? ["shift-keys-fk"] : []),
          ...(keys.secondary ? ["dual-keys-fk"] : []),
        ];
        const primaryKeyClasses = [
          "primary-key-fk",
          ...(/[a-z]/.test() && keys.primary.length === 1
            ? ["letters-fk"]
            : []),
        ];

        primaryKey.textContent = keys.primary;
        secondaryKey.textContent = keys.secondary;

        keyboardKeys.classList.add(...keyboardKeysClasses);
        primaryKey.classList.add(...primaryKeyClasses);
        secondaryKey.classList.add("secondary-key-fk");

        keyboardRow.append(keyboardKeys);
        keyboardKeys.append(primaryKey);
        keyboardKeys.append(secondaryKey);
      });
    });
  }

  createFullKeyboardLayout(
    firstRowKeysFk,
    secondRowKeysFk,
    thirdRowKeysFk,
    fourthRowKeysFk,
    fifthRowKeysFk
  );

  createNumericKeyboard();

  function makeKeyboardDraggable(keyboardContainerVk) {
    let offsetX,
      offsetY,
      isDragging = false;

    keyboardContainerVk.addEventListener("mousedown", (e) => {
      const rect = keyboardContainerVk.getBoundingClientRect();
      const paddingTop = parseInt(
        getComputedStyle(keyboardContainerVk).paddingTop
      );
      if (
        rect.x + rect.width >= e.clientX &&
        rect.x <= e.clientX &&
        rect.y + paddingTop >= e.clientY &&
        rect.y <= e.clientY
      ) {
        isDragging = true;
        offsetX = e.clientX - rect.x;
        offsetY = e.clientY - rect.y;
      }
    });

    keyboardContainerVk.addEventListener("mousemove", (e) => {
      const clientY = e.clientY;
      const keyboardY = keyboardContainerVk.getBoundingClientRect().y;
      const computedKeyboard = getComputedStyle(keyboardContainerVk);
      const keyboardWidth = parseInt(computedKeyboard.width);
      const borderWidth = parseInt(computedKeyboard.borderWidth);
      const paddingLeft = parseInt(computedKeyboard.paddingLeft);
      const paddingTop = parseInt(computedKeyboard.paddingTop);
      const totalX =
        e.clientX - offsetX + keyboardWidth / 2 + borderWidth + paddingLeft;
      const totalY = e.clientY - offsetY;

      if (clientY - keyboardY <= paddingTop + borderWidth) {
        keyboardContainerVk.style.cursor = "grab";
      } else keyboardContainerVk.style.cursor = "auto";

      if (isDragging) {
        keyboardContainerVk.style.left = `${totalX}px`;
        keyboardContainerVk.style.top = `${totalY}px`;
        keyboardContainerVk.style.right = `auto`;
        keyboardContainerVk.style.bottom = "auto";
      }
    });

    keyboardContainerVk.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = !isDragging;
      }
    });
  }

  const lettersFk = document.querySelectorAll(".letters-fk");
  const keysFk = document.querySelectorAll(".keys-fk");
  const keysNk = document.querySelectorAll(".keys-nk");
  const dualKeysFk = document.querySelectorAll(".dual-keys-fk");
  const ShiftKeysFk = document.querySelectorAll(".shift-keys-fk");
  let isCapsPressed = false;
  let isShiftPressed = false;
  let focusedInput, selectionStart, selectionEnd;
  const setRangeTextTypes = [
    "number",
    "email",
    "date",
    "time",
    "week",
    "month",
  ];

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      focusedInput = document.activeElement;
      if (e.target.type === "number") {
        numericKeyboardContainerNk.style.display = "flex";
        fullKeyboardContainer.style.display = "none";
      } else {
        fullKeyboardContainer.style.display = "grid";
        numericKeyboardContainerNk.style.display = "none";
      }
    }
  });

  keysNk.forEach((keyNk) => {
    keyNk.addEventListener("click", () => {
      if (keyNk.textContent === "Delete") {
        focusedInput.value = focusedInput.value.slice(0, -1);
      } else {
        focusedInput.value += keyNk.textContent;
      }
    });
  });

  keysFk.forEach((keyFk) => {
    keyFk.addEventListener("click", () => {
      const key = keyFk.firstElementChild;
      if (key.textContent === "Caps" || key.textContent === "Shift")
        handleShiftAndCaps(key.parentElement);

      if (!focusedInput) return;
      if (setRangeTextTypes.includes(focusedInput.type)) {
        if (key.textContent === "Backspace")
          focusedInput.value = focusedInput.value.slice(0, -1);
        else if (key.textContent === "Tab") focusedInput.value += "    ";
        else if (key.textContent === "________") focusedInput.value += " ";
        else if (key.textContent === "Enter") focusedInput.value += "\n";
        else if (key.textContent === "Shift" || key.textContent === "Caps")
          return;
        else {
          focusedInput.value += key.textContent;
          if (isShiftPressed) {
            changeDualKeys();
            ShiftKeysFk.forEach((key) => toggleHighlight(key));
            isShiftPressed = !isShiftPressed;
            capsShiftCombination();
          }
        }
      } else {
        inputType = focusedInput.type;
        focusedInput.focus();
        let replacement;
        selectionStart = focusedInput.selectionStart;
        selectionEnd = focusedInput.selectionEnd;

        if (key.textContent === "Backspace") {
          replacement = "";
          if (selectionStart === selectionEnd && selectionStart > 0) {
            selectionStart--;
          }
        } else if (key.textContent === "Del") {
          replacement = "";
          if (
            selectionStart === selectionEnd &&
            selectionEnd < focusedInput.value.length
          ) {
            selectionEnd++;
          }
        } else if (key.textContent === "________") replacement = " ";
        else if (key.textContent === "Enter") replacement = "\n";
        else if (key.textContent === "Tab") replacement = "    ";
        else if (key.textContent === "Shift" || key.textContent === "Caps") {
          return;
        } else {
          replacement = key.textContent;
          if (isShiftPressed) {
            changeDualKeys();
            ShiftKeysFk.forEach((key) => toggleHighlight(key));
            isShiftPressed = !isShiftPressed;
            capsShiftCombination();
          }
        }

        focusedInput.setRangeText(
          replacement,
          selectionStart,
          selectionEnd,
          "end"
        );
      }
    });

    function changeDualKeys() {
      dualKeysFk.forEach((key) => {
        const primaryKey = key.firstElementChild;
        const secondaryKey = key.lastElementChild;

        [primaryKey.innerText, secondaryKey.innerText] = [
          secondaryKey.innerText,
          primaryKey.innerText,
        ];
      });
    }

    const handleShiftAndCaps = (_key) => {
      if (_key.innerText === "Caps") {
        isCapsPressed = !isCapsPressed;
        toggleHighlight(_key);
      } else if (_key.innerText === "Shift") {
        isShiftPressed = !isShiftPressed;
        changeDualKeys();
        ShiftKeysFk.forEach((key) => toggleHighlight(key));
      }

      capsShiftCombination();
    };

    const capsShiftCombination = () => {
      lettersFk.forEach((letter) => {
        letter.innerText =
          (isCapsPressed || isShiftPressed) &&
          !(isCapsPressed && isShiftPressed)
            ? letter.innerText.toUpperCase()
            : letter.innerText.toLowerCase();
      });
    };

    function toggleHighlight(_key) {
      if (_key.innerText === "Caps") {
        _key.classList.toggle("key-pressed-color-fk");
        return;
      }

      if (_key.classList.contains("key-pressed-color-fk"))
        _key.classList.remove("key-pressed-color-fk");
      else _key.classList.add("key-pressed-color-fk");
    }
  });
})();
