const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");



/* ================= SIDEBAR ================= */

function openMenu() {

    sidebar.classList.add("open");

    overlay.classList.add("show");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow = "";
}


menuButton.addEventListener(
    "click",
    openMenu
);

closeButton.addEventListener(
    "click",
    closeMenu
);

overlay.addEventListener(
    "click",
    closeMenu
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            sidebar.classList.contains("open")
        ) {
            closeMenu();
        }

    }
);


document
    .querySelectorAll(".side-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            closeMenu
        );

    });



/* ================= STORAGE ================= */

function saveSetting(key, value) {

    localStorage.setItem(
        "educationweb_" + key,
        JSON.stringify(value)
    );

}


function getSetting(key, fallback) {

    const value = localStorage.getItem(
        "educationweb_" + key
    );

    if (value === null) {
        return fallback;
    }

    try {

        return JSON.parse(value);

    } catch {

        return fallback;

    }

}



/* ================= THEME ================= */

const themeSelect =
    document.getElementById("themeSelect");


function applyTheme(theme) {

    document.body.classList.remove(
        "light-theme"
    );

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }

    if (theme === "system") {

        const systemDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (!systemDark) {

            document.body.classList.add(
                "light-theme"
            );

        }

    }

}


themeSelect.addEventListener(
    "change",
    function() {

        const theme =
            themeSelect.value;

        saveSetting(
            "theme",
            theme
        );

        applyTheme(theme);

    }
);



/* ================= ACCENT ================= */

const accentSelect =
    document.getElementById("accentSelect");


function applyAccent(accent) {

    document.body.classList.remove(
        "accent-purple",
        "accent-green",
        "accent-orange"
    );

    if (accent !== "blue") {

        document.body.classList.add(
            "accent-" + accent
        );

    }

}


accentSelect.addEventListener(
    "change",
    function() {

        const accent =
            accentSelect.value;

        saveSetting(
            "accent",
            accent
        );

        applyAccent(accent);

    }
);



/* ================= TEXT SIZE ================= */

const textDecrease =
    document.getElementById("textDecrease");

const textIncrease =
    document.getElementById("textIncrease");

const textSizeValue =
    document.getElementById("textSizeValue");


let textSize =
    getSetting("textSize", 100);


function applyTextSize() {

    document.documentElement.style.fontSize =
        textSize + "%";

    textSizeValue.textContent =
        textSize + "%";

}


textDecrease.addEventListener(
    "click",
    function() {

        if (textSize > 80) {

            textSize -= 10;

            saveSetting(
                "textSize",
                textSize
            );

            applyTextSize();

        }

    }
);


textIncrease.addEventListener(
    "click",
    function() {

        if (textSize < 140) {

            textSize += 10;

            saveSetting(
                "textSize",
                textSize
            );

            applyTextSize();

        }

    }
);



/* ================= LINE HEIGHT ================= */

const lineHeight =
    document.getElementById("lineHeight");


lineHeight.addEventListener(
    "change",
    function() {

        const value =
            lineHeight.value;

        saveSetting(
            "lineHeight",
            value
        );

        document.body.style.lineHeight =
            value === "large"
                ? "2"
                : value === "comfortable"
                    ? "1.8"
                    : "normal";

    }
);



/* ================= FONT ================= */

const fontSelect =
    document.getElementById("fontSelect");


fontSelect.addEventListener(
    "change",
    function() {

        const value =
            fontSelect.value;

        saveSetting(
            "font",
            value
        );

        if (value === "serif") {

            document.body.style.fontFamily =
                "Georgia, serif";

        }

        else if (value === "mono") {

            document.body.style.fontFamily =
                "monospace";

        }

        else {

            document.body.style.fontFamily =
                "Inter, system-ui, sans-serif";

        }

    }
);



/* ================= CHECKBOX SETTINGS ================= */

const checkboxSettings = {

    compactMode: "compact",

    animations: "animations",

    focusMode: "focus",

    autoScroll: "autoScroll",

    studyReminder: "studyReminder",

    newContent: "newContent",

    soundEffects: "soundEffects",

    highContrast: "highContrast",

    reduceMotion: "reduceMotion",

    largeButtons: "largeButtons",

    subjectCount: "subjectCount",

    rememberSearch: "rememberSearch",

    savePreferences: "savePreferences",

    localStorage: "localStorage"

};



function applyCheckbox(
    elementId,
    className,
    defaultValue
) {

    const element =
        document.getElementById(elementId);

    const saved =
        getSetting(
            elementId,
            defaultValue
        );

    element.checked = saved;

    if (className) {

        document.body.classList.toggle(
            className,
            saved
        );

    }

    element.addEventListener(
        "change",
        function() {

            const enabled =
                element.checked;

            saveSetting(
                elementId,
                enabled
            );

            if (className) {

                document.body.classList.toggle(
                    className,
                    enabled
                );

            }

        }
    );

}


Object.entries(
    checkboxSettings
).forEach(
    ([id, className]) => {

        applyCheckbox(
            id,
            className,
            false
        );

    }
);



/* ================= READING WIDTH ================= */

const readingWidth =
    document.getElementById("readingWidth");


readingWidth.addEventListener(
    "change",
    function() {

        const value =
            readingWidth.value;

        saveSetting(
            "readingWidth",
            value
        );

        if (value === "narrow") {

            document.documentElement.style.setProperty(
                "--reading-width",
                "700px"
            );

        }

        else if (value === "wide") {

            document.documentElement.style.setProperty(
                "--reading-width",
                "1100px"
            );

        }

        else {

            document.documentElement.style.setProperty(
                "--reading-width",
                "900px"
            );

        }

    }
);



/* ================= LANGUAGE ================= */

const languageSelect =
    document.getElementById(
        "languageSelect"
    );


languageSelect.addEventListener(
    "change",
    function() {

        saveSetting(
            "language",
            languageSelect.value
        );

        /*
         * Future multilingual system
         * can be connected here.
         */

    }
);



/* ================= RESET ================= */

const resetSettings =
    document.getElementById(
        "resetSettings"
    );


resetSettings.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Reset all EducationWeb settings?"
            );

        if (!confirmed) {
            return;
        }

        Object.keys(localStorage)
            .filter(key =>
                key.startsWith(
                    "educationweb_"
                )
            )
            .forEach(key =>
                localStorage.removeItem(key)
            );

        location.reload();

    }
);



/* ================= LOAD SAVED SETTINGS ================= */

function loadSettings() {

    const theme =
        getSetting(
            "theme",
            "dark"
        );

    themeSelect.value =
        theme;

    applyTheme(theme);



    const accent =
        getSetting(
            "accent",
            "blue"
        );

    accentSelect.value =
        accent;

    applyAccent(accent);



    textSize =
        getSetting(
            "textSize",
            100
        );

    applyTextSize();



    const savedLineHeight =
        getSetting(
            "lineHeight",
            "normal"
        );

    lineHeight.value =
        savedLineHeight;

    document.body.style.lineHeight =
        savedLineHeight === "large"
            ? "2"
            : savedLineHeight === "comfortable"
                ? "1.8"
                : "normal";



    const savedFont =
        getSetting(
            "font",
            "system"
        );

    fontSelect.value =
        savedFont;

    if (savedFont === "serif") {

        document.body.style.fontFamily =
            "Georgia, serif";

    }

    else if (savedFont === "mono") {

        document.body.style.fontFamily =
            "monospace";

    }



    const savedWidth =
        getSetting(
            "readingWidth",
            "normal"
        );

    readingWidth.value =
        savedWidth;



    const savedLanguage =
        getSetting(
            "language",
            "en"
        );

    languageSelect.value =
        savedLanguage;

}


loadSettings();