function navigateToLogin() {
    const selectElement = document.getElementById('collegeSelect');
    const selectedValue = selectElement.value;

    if (selectedValue) {
        // Redirect to the selected login page
        window.location.href = selectedValue;
    }
}



function checkSelection() {
    const semester = document.getElementById('semester').value;
    const stream = document.getElementById('stream').value;

    if (semester && stream) {
        // Define the mapping of combinations to URLs
        const urlMap = {
            'cse_1': '',
            'cse_2': 'cse_2nd_sem.html',
            'csit_5': 'http://bhaskar567.infinityfreeapp.com',
            'me_3': 'me_3rd_sem.html',
            // Add more combinations here
        };

        const key = `${stream}_${semester}`;
        const targetUrl = urlMap[key];

        if (targetUrl) {
            // Redirect to the mapped URL
            window.location.href = targetUrl;
        } else {
            alert('Page not available for the selected combination.');
        }
    }
}
