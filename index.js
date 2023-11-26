(function () {
  const letters = document.querySelectorAll(".letters");
  const capsKey = document.querySelector("#caps-key");
  const keys = document.querySelectorAll(".keys");
  const dualKeys = document.querySelectorAll(".dual-keys");
  const shiftKeys = document.querySelectorAll(".shift-keys");
  const keyColor = getComputedStyle(capsKey).backgroundColor;
  let capsPressed = false;
  let isShiftPressed = false;
  let focusedInput, selectionStart, selectionEnd;

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      focusedInput = document.activeElement;
      selectionStart = focusedInput.selectionStart;
      selectionEnd = focusedInput.selectionEnd;
    }
  });

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      if (key.innerText === "Caps" || key.innerText === "Shift")
        handleShiftAndCaps(key);

      if (!focusedInput) return;
      if (
        focusedInput.tagName === "INPUT" ||
        focusedInput.tagName === "TEXTAREA"
      ) {
        focusedInput.focus();
        let replacement;
        selectionStart = focusedInput.selectionStart;
        selectionEnd = focusedInput.selectionEnd;

        if (key.innerText === "Backspace") {
          replacement = "";
          if (selectionStart === selectionEnd && selectionStart > 0) {
            selectionStart--;
          }
        } else if (key.innerText === "Del") {
          replacement = "";
          if (
            selectionStart === selectionEnd &&
            selectionEnd < focusedInput.value.length
          ) {
            selectionEnd++;
          }
        } else if (key.innerText === "________") replacement = " ";
        else if (key.innerText === "Enter") replacement = "\n";
        else if (key.innerText === "Shift" || key.innerText === "Caps") {
          return;
        } else {
          console.log(key.innerText);
          replacement = key.innerText;
          if (isShiftPressed) {
            console.log("ulazi");
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

    const handleShiftAndCaps = (key) => {
      if (key.innerText === "Caps") {
        capsPressed = !capsPressed;
        toggleHighlight(key);
      } else if (key.innerText === "Shift") {
        isShiftPressed = !isShiftPressed;
        changeDualKeys();
        shiftKeys.forEach((key) => toggleHighlight(key));
      }

      capsShiftCombination();
    };

    const capsShiftCombination = () => {
      letters.forEach((letter) => {
        letter.innerText =
          (capsPressed || isShiftPressed) && !(capsPressed && isShiftPressed)
            ? letter.innerText.toUpperCase()
            : letter.innerText.toLowerCase();
      });
    };

    function toggleHighlight(_key) {
      if (key.innerText === "Caps") {
        _key.classList.toggle("key-pressed-color");
        return;
      }

      if (_key.classList.contains("key-pressed-color"))
        _key.classList.remove("key-pressed-color");
      else _key.classList.add("key-pressed-color");
    }
  });
})();
