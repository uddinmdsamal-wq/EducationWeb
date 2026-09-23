
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


        /* =========================
           SUBJECT DATA
        ========================= */

        const subjects = [

            ["Mathematics", "books/science/Mathematics.html"],
            ["Physics", "books/science/Physics.html"],
            ["Chemistry", "books/science/Chemistry.html"],
            ["Biology", "books/science/Biology.html"],
            ["Computer Science", "books/science/ComputerScience.html"],
            ["Astronomy", "books/science/Astronomy.html"],
            ["Earth Science", "books/science/EarthScience.html"],
            ["Environmental Science", "books/science/EnvironmentalScience.html"],
            ["Geography", "books/science/Geography.html"],
            ["Geology", "books/science/Geology.html"],
            ["Psychology", "books/science/Psychology.html"],
            ["Philosophy", "books/science/Philosophy.html"],
            ["History", "books/science/History.html"],
            ["Sociology", "books/science/Sociology.html"],
            ["Anthropology", "books/science/Anthropology.html"],
            ["Political Science", "books/science/PoliticalScience.html"],
            ["Economics", "books/science/Economics.html"],
            ["Law", "books/science/Law.html"],
            ["Linguistics", "books/science/Linguistics.html"],
            ["Literature", "books/science/Literature.html"],
            ["Languages", "books/science/Languages.html"],
            ["Engineering", "books/science/Engineering.html"],
            ["Medicine", "books/science/Medicine.html"],
            ["Nursing", "books/science/Nursing.html"],
            ["Pharmacy", "books/science/Pharmacy.html"],
            ["Agriculture", "books/science/Agriculture.html"],
            ["Architecture", "books/science/Architecture.html"],
            ["Business Studies", "books/science/BusinessStudies.html"],
            ["Accounting", "books/science/Accounting.html"],
            ["Finance", "books/science/Finance.html"],
            ["Statistics", "books/science/Statistics.html"],
            ["Data Science", "books/science/DataScience.html"],
            ["Artificial Intelligence", "books/science/ArtificialIntelligence.html"],
            ["Robotics", "books/science/Robotics.html"],
            ["Biotechnology", "books/science/Biotechnology.html"],
            ["Neuroscience", "books/science/Neuroscience.html"],
            ["Logic", "books/science/Logic.html"],
            ["Ethics", "books/science/Ethics.html"],
            ["Education", "books/science/Education.html"],
            ["Fine Arts", "books/science/FineArts.html"],
            ["Music", "books/science/Music.html"],
            ["Theatre", "books/science/Theatre.html"],
            ["Physical Education", "books/science/PhysicalEducation.html"],
            ["Sports Science", "books/science/SportsScience.html"],
            ["Communication Studies", "books/science/CommunicationStudies.html"],
            ["Media Studies", "books/science/MediaStudies.html"],
            ["Information Science", "books/science/InformationScience.html"],
            ["Materials Science", "books/science/MaterialsScience.html"],
            ["Nanotechnology", "books/science/Nanotechnology.html"],
            ["Cognitive Science", "books/science/CognitiveScience.html"]

        ];


        /* =========================
           CREATE SUBJECT CARDS
        ========================= */

        const container =
            document.getElementById("subjects");

        subjects.forEach((subject, index) => {

            const link = document.createElement("a");

            link.className = "subject";

            link.href = subject[1];

            link.dataset.name =
                subject[0].toLowerCase();

            link.innerHTML = `

                <span class="subject-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="subject-content">

                    <span class="subject-name">
                        ${subject[0]}
                    </span>

                    <span class="subject-type">
                        Educational Subject
                    </span>

                </span>

                <span class="arrow">
                    ›
                </span>

            `;

            container.appendChild(link);

        });


        /* =========================
           SEARCH
        ========================= */

        const search =
            document.getElementById("search");

        const count =
            document.getElementById("count");

        const noResult =
            document.getElementById("noResult");


        search.addEventListener("input", () => {

            const value =
                search.value
                    .trim()
                    .toLowerCase();

            let visible = 0;

            document
                .querySelectorAll(".subject")
                .forEach(card => {

                    const match =
                        card.dataset.name
                            .includes(value);

                    card.style.display =
                        match ? "flex" : "none";

                    if (match) {
                        visible++;
                    }

                });


            count.textContent =
                `${visible} Subject${visible === 1 ? "" : "s"}`;


            noResult.style.display =
                visible === 0
                    ? "block"
                    : "none";

        });

const menuButton =
    document.getElementById("menuButton");

const closeButton =
    document.getElementById("closeButton");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


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