
/* ==========================================================
   EDUCATIONWEB GLOBAL SETTINGS ENGINE
   ========================================================== */

(function () {

    "use strict";

    const PREFIX = "educationweb_";


    /* ======================================================
       GET SAVED SETTING
       ====================================================== */

    function getSetting(key, fallback) {

        const value =
            localStorage.getItem(
                PREFIX + key
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


    /* ======================================================
       THEME
       ====================================================== */

    function applyTheme() {

        const theme =
            getSetting("theme", "dark");

        document.body.classList.remove(
            "light-theme"
        );


        if (theme === "light") {

            document.body.classList.add(
                "light-theme"
            );

        }


        if (theme === "system") {

            const dark =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;

            if (!dark) {

                document.body.classList.add(
                    "light-theme"
                );

            }

        }

    }


    /* ======================================================
       ACCENT
       ====================================================== */

    function applyAccent() {

        const accent =
            getSetting(
                "accent",
                "blue"
            );

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


    /* ======================================================
       TEXT SIZE
       ====================================================== */

    function applyTextSize() {

        const size =
            getSetting(
                "textSize",
                100
            );

        const safeSize =
            Math.max(
                80,
                Math.min(
                    140,
                    Number(size) || 100
                )
            );

        document.documentElement.style.fontSize =
            safeSize + "%";

    }


    /* ======================================================
       FONT
       ====================================================== */

    function applyFont() {

        const font =
            getSetting(
                "font",
                "system"
            );


        if (font === "serif") {

            document.body.style.fontFamily =
                "Georgia, serif";

        }

        else if (font === "mono") {

            document.body.style.fontFamily =
                "monospace";

        }

        else {

            document.body.style.fontFamily =
                'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

        }

    }


    /* ======================================================
       LINE HEIGHT
       ====================================================== */

    function applyLineHeight() {

        const value =
            getSetting(
                "lineHeight",
                "normal"
            );


        if (value === "large") {

            document.body.style.lineHeight =
                "2";

        }

        else if (value === "comfortable") {

            document.body.style.lineHeight =
                "1.8";

        }

        else {

            document.body.style.lineHeight =
                "normal";

        }

    }


    /* ======================================================
       BODY CLASSES
       ====================================================== */

    function applyBooleanSettings() {

        const settings = {

            compactMode: "compact",

            focusMode: "focus-mode",

            highContrast: "high-contrast",

            reduceMotion: "reduce-motion",

            largeButtons: "large-buttons"

        };


        for (
            const [setting, className]
            of Object.entries(settings)
        ) {

            const enabled =
                getSetting(
                    setting,
                    false
                );

            document.body.classList.toggle(
                className,
                Boolean(enabled)
            );

        }

    }


    /* ======================================================
       READING WIDTH
       ====================================================== */

    function applyReadingWidth() {

        const value =
            getSetting(
                "readingWidth",
                "normal"
            );


        let width = "900px";


        if (value === "narrow") {

            width = "700px";

        }

        else if (value === "wide") {

            width = "1100px";

        }


        document.documentElement.style.setProperty(
            "--reading-width",
            width
        );

    }


    /* ======================================================
       APPLY EVERYTHING
       ====================================================== */

    function applyAllSettings() {

        applyTheme();

        applyAccent();

        applyTextSize();

        applyFont();

        applyLineHeight();

        applyBooleanSettings();

        applyReadingWidth();

    }


    /* ======================================================
       RUN
       ====================================================== */

    applyAllSettings();


    /* ======================================================
       SYSTEM THEME LISTENER
       ====================================================== */

    const media =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    media.addEventListener(
        "change",
        function () {

            if (
                getSetting(
                    "theme",
                    "dark"
                ) === "system"
            ) {

                applyTheme();

            }

        }
    );


    /* ======================================================
       GLOBAL ACCESS
       ====================================================== */

    window.EducationWebSettings = {

        reload: applyAllSettings,

        get: getSetting

    };


})();


const menuButton =
    document.getElementById("menuButton");

const closeButton =
    document.getElementById("closeButton");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


/* ==============================
   OPEN MENU
============================== */

function openMenu() {

    sidebar.classList.add("open");

    overlay.classList.add("show");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow = "hidden";
}


/* ==============================
   CLOSE MENU
============================== */

function closeMenu() {

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow = "";
}


/* ==============================
   MENU BUTTON
============================== */

menuButton.addEventListener(
    "click",
    openMenu
);


/* ==============================
   CLOSE BUTTON
============================== */

closeButton.addEventListener(
    "click",
    closeMenu
);


/* ==============================
   OVERLAY
============================== */

overlay.addEventListener(
    "click",
    closeMenu
);


/* ==============================
   ESC KEY
============================== */

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


/* ==============================
   SIDEBAR LINKS
============================== */

document
    .querySelectorAll(".side-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                closeMenu();

            }
        );

    });