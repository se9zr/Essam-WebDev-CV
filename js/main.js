document.addEventListener("DOMContentLoaded", () => {
    getMyPublicIP(); // API #1
    setupIPLookup(); // API #2
});

/* API #1 – Detect My IP */
function getMyPublicIP() {
    const box = document.getElementById("my-ip-box");

    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
            box.innerHTML = `
                <h3>Your Public IP</h3>
                <p><strong>IP Address:</strong> ${data.ip}</p>
                <p class="small-note">
                    This is detected automatically using the ipify API.
                </p>
            `;
        })
        .catch(() => {
            box.innerHTML = `<p style="color:red;">Unable to detect your public IP.</p>`;
        });
}

/* API #2 – Lookup Any IP */
function setupIPLookup() {
    const form = document.getElementById("ip-form");
    const ipInput = document.getElementById("ip-input");
    const box = document.getElementById("api-box");
    const clearBtn = document.getElementById("clear-btn");

    ipInput.addEventListener("keyup", () => {
        ipInput.style.borderColor = "";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ip = ipInput.value.trim();

        if (!ip) {
            box.innerHTML = `<p style="color:red;">Please enter an IP address.</p>`;
            ipInput.style.borderColor = "red";
            return;
        }

        box.textContent = "Fetching data...";

        fetch(`https://ipwho.is/${ip}`)
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    box.innerHTML = `<p style="color:red;">Invalid or unreachable IP address.</p>`;
                    return;
                }

                box.innerHTML = `
                    <h3>IP Details</h3>
                    <p><strong>IP:</strong> ${data.ip}</p>
                    <p><strong>City:</strong> ${data.city}</p>
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Country:</strong> ${data.country}</p>
                    <p><strong>ISP:</strong> ${data.connection.isp}</p>
                    <p><strong>Timezone:</strong> ${data.timezone.id}</p>
                `;
            })
            .catch(() => {
                box.innerHTML = `<p style="color:red;">Network error. Try again.</p>`;
            });
    });

    clearBtn.addEventListener("click", () => {
        box.innerHTML = "Enter an IP to analyze.";
        ipInput.value = "";
    });
}
