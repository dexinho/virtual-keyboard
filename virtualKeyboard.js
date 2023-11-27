(function () {
  const firstRowKeys = [
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

  const secondRowKeys = [
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

  const thirdRowKeys = [
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

  const fourthRowKeys = [
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

  const fifthRowKeys = [{ primary: "________", secondary: "" }];

  function createKeyboardLayout(...rows) {
    const keyboardContainer = document.createElement("div");
    document.body.append(keyboardContainer);
    keyboardContainer.id = "keyboard-container-vk";

    rows.forEach((row, index) => {
      const keyboardRow = document.createElement("div");
      keyboardRow.classList.add("keyboard-row-vk");
      keyboardRow.id =
        index === 0
          ? "first-row-vk"
          : index === 1
          ? "second-row-vk"
          : index === 2
          ? "third-row-vk"
          : index === 3
          ? "fourth-row-vk"
          : "fifth-row-vk";

      keyboardContainer.append(keyboardRow);
      row.forEach((keys) => {
        const primaryKey = document.createElement("div");
        const secondaryKey = document.createElement("div");
        const keyboardKeys = document.createElement("div");

        const keyboardKeysClasses = [
          "keys-vk",
          ...(keys.primary === "Shift" ? ["shift-keys-vk"] : []),
          ...(keys.secondary ? ["dual-keys-vk"] : []),
        ];
        const primaryKeyClasses = [
          "primary-key-vk",
          ...(/[a-z]/.test() && keys.primary.length === 1
            ? ["letters-vk"]
            : []),
        ];

        primaryKey.textContent = keys.primary;
        secondaryKey.textContent = keys.secondary;

        keyboardKeys.classList.add(...keyboardKeysClasses);
        primaryKey.classList.add(...primaryKeyClasses);
        secondaryKey.classList.add("secondary-key-vk");

        keyboardRow.append(keyboardKeys);
        keyboardKeys.append(primaryKey);
        keyboardKeys.append(secondaryKey);
      });
    });
  }

  createKeyboardLayout(
    firstRowKeys,
    secondRowKeys,
    thirdRowKeys,
    fourthRowKeys,
    fifthRowKeys
  );

  const letters = document.querySelectorAll(".letters-vk");
  const keys = document.querySelectorAll(".keys-vk");
  const dualKeys = document.querySelectorAll(".dual-keys-vk");
  const shiftKeys = document.querySelectorAll(".shift-keys-vk");
  let isCapsPressed = false;
  let isShiftPressed = false;
  let focusedInput, selectionStart, selectionEnd;

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
      focusedInput = document.activeElement;
  });

  keys.forEach((keyboardKey) => {
    keyboardKey.addEventListener("click", () => {
      const key = keyboardKey.firstElementChild;
      if (key.textContent === "Caps" || key.textContent === "Shift")
        handleShiftAndCaps(key.parentElement);

      if (!focusedInput) return;
      if (
        focusedInput.tagName === "INPUT" ||
        focusedInput.tagName === "TEXTAREA"
      ) {
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
            shiftKeys.forEach((key) => toggleHighlight(key));
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
      dualKeys.forEach((key) => {
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
        shiftKeys.forEach((key) => toggleHighlight(key));
      }

      capsShiftCombination();
    };

    const capsShiftCombination = () => {
      letters.forEach((letter) => {
        letter.innerText =
          (isCapsPressed || isShiftPressed) && !(isCapsPressed && isShiftPressed)
            ? letter.innerText.toUpperCase()
            : letter.innerText.toLowerCase();
      });
    };

    function toggleHighlight(_key) {
      if (_key.innerText === "Caps") {
        _key.classList.toggle("key-pressed-color-vk");
        return;
      }

      if (_key.classList.contains("key-pressed-color-vk"))
        _key.classList.remove("key-pressed-color-vk");
      else _key.classList.add("key-pressed-color-vk");
    }
  });
})();
