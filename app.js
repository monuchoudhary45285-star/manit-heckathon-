/* =========================
   SYMPTOMS
========================= */

function addSymptom(symptom) {

    const input =
        document.getElementById("symptomInput");

    if (input.value === "") {

        input.value = symptom;

    } else {

        input.value += ", " + symptom;

    }
}


function getGuidance() {

    const input =
        document.getElementById("symptomInput").value.trim();

    const guidance =
        document.getElementById("guidance");


    if (input === "") {

        alert("Please enter your symptoms.");

        return;
    }


    const emergencySymptoms = [

        "severe pain",
        "difficulty breathing",
        "fainting",
        "heavy bleeding",
        "chest pain"

    ];


    const isEmergency =
        emergencySymptoms.some(
            symptom =>
                input.toLowerCase().includes(symptom)
        );


    if (isEmergency) {

        guidance.innerHTML = `

            <div class="empty">

                <div class="medical-icon">
                    ⚠️
                </div>

                <h3>
                    Please Seek Professional Care
                </h3>

                <p>
                    Some symptoms may require
                    prompt medical attention.
                    Please contact a qualified
                    healthcare professional.
                </p>

            </div>

        `;

    } else {

        guidance.innerHTML = `

            <div class="empty">

                <div class="medical-icon">
                    🩺
                </div>

                <h3>
                    General Health Guidance
                </h3>

                <p>
                    Take adequate rest, stay hydrated
                    when appropriate and monitor your
                    symptoms.
                </p>

                <br>

                <p>
                    If symptoms continue or become worse,
                    consult a qualified healthcare professional.
                </p>

            </div>

        `;
    }
}


/* =========================
   REMINDERS
========================= */

let reminders =
    JSON.parse(
        localStorage.getItem("reminders")
    ) || [];


function addReminder() {

    const name =
        document.getElementById("reminderName").value;

    const time =
        document.getElementById("reminderTime").value;

    const type =
        document.getElementById("reminderType").value;


    if (name === "" || time === "") {

        alert("Please enter reminder name and time.");

        return;
    }


    const reminder = {

        name: name,

        time: time,

        type: type

    };


    reminders.push(reminder);


    localStorage.setItem(
        "reminders",
        JSON.stringify(reminders)
    );


    document.getElementById("reminderName").value = "";

    document.getElementById("reminderTime").value = "";


    displayReminders();
}


function displayReminders() {

    const list =
        document.getElementById("reminderList");


    list.innerHTML = "";


    if (reminders.length === 0) {

        list.innerHTML =
            "<p>No reminders added yet.</p>";

        return;
    }


    reminders.forEach(
        (reminder, index) => {

            const div =
                document.createElement("div");


            div.className =
                "reminder-item";


            div.innerHTML = `

                <div>

                    <strong>
                        ${reminder.name}
                    </strong>

                    <small>
                        ${reminder.type}
                        •
                        ${reminder.time}
                    </small>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteReminder(${index})">

                    Delete

                </button>

            `;


            list.appendChild(div);

        }
    );
}


function deleteReminder(index) {

    reminders.splice(index, 1);


    localStorage.setItem(
        "reminders",
        JSON.stringify(reminders)
    );


    displayReminders();
}


/* =========================
   HEALTHCARE FINDER
========================= */

const centres = [

    {
        name: "Women's Health Centre",
        type: "Women's health consultation"
    },

    {
        name: "Community Care Clinic",
        type: "General healthcare"
    },

    {
        name: "District Hospital",
        type: "Hospital & specialist services"
    }

];


function findHealthcare() {

    const location =
        document.getElementById("location").value;


    const result =
        document.getElementById(
            "healthcareResults"
        );


    const area =
        location || "Your Area";


    result.innerHTML = "";


    centres.forEach(
        centre => {

            const div =
                document.createElement("div");


            div.className = "centre";


            div.innerHTML = `

                <div style="font-size:25px">
                    📍
                </div>

                <h3>
                    ${centre.name}
                </h3>

                <p>
                    ${centre.type}
                </p>

                <p>
                    Location:
                    ${area}
                </p>

            `;


            result.appendChild(div);

        }
    );
}


/* =========================
   PROFILE
========================= */

function openProfile() {

    document
        .getElementById("profileModal")
        .classList.add("show");

}


function closeProfile() {

    document
        .getElementById("profileModal")
        .classList.remove("show");

}


function saveProfile() {

    const name =
        document.getElementById(
            "profileName"
        ).value;

    const age =
        document.getElementById(
            "profileAge"
        ).value;

    const language =
        document.getElementById(
            "profileLanguage"
        ).value;


    if (name === "" || age === "") {

        alert("Please enter your name and age.");

        return;
    }


    const profile = {

        name: name,

        age: age,

        language: language

    };


    localStorage.setItem(
        "profile",
        JSON.stringify(profile)
    );


    displayProfile();

    closeProfile();

    alert("Profile saved successfully!");
}


function displayProfile() {

    const profile =
        JSON.parse(
            localStorage.getItem("profile")
        );


    if (!profile) return;


    document.getElementById(
        "profileText"
    ).innerText =

        ${profile.name}, ${profile.age} years • Language: ${profile.language};
}


/* =========================
   MEDICAL NOTES
========================= */

function addNote() {

    const note =
        prompt(
            "Enter your medical note:"
        );


    if (note) {

        localStorage.setItem(
            "medicalNote",
            note
        );


        alert("Note saved successfully!");

    }
}


/* =========================
   PAGE LOAD
========================= */

window.onload = function () {

    displayReminders();

    displayProfile();

    findHealthcare();

};