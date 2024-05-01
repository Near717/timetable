// Fetch event data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Function to create an event element
        function createEventElement(event) {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.style.top = calculateTopPosition(event.start);
            eventElement.style.height = calculateHeight(event.start, event.end);
            eventElement.style.backgroundColor = event.color; // Set the background color

            // Create a title element for the event
            const titleElement = document.createElement('div');
            titleElement.textContent = event.title;

            // Create a time element for the event
            const timeElement = document.createElement('div');
            timeElement.textContent = `${event.start} - ${event.end}`;

            // Append the title and time elements to the event element
            eventElement.appendChild(titleElement);
            eventElement.appendChild(timeElement);

            // Conditionally hide title text if event title is "away" or "sleep"
            const lowerCaseTitle = event.title.toLowerCase();
            if (lowerCaseTitle === "away" || lowerCaseTitle === "sleep") {
                titleElement.style.display = 'none';
            }

            return eventElement;
        }

        // Function to calculate top position
        function calculateTopPosition(time) {
            // Split the time string into hours and minutes
            const [hours, minutes] = time.split(':').map(Number);

            /* // Convert the time to minutes since midnight
            const totalTimeInMinutes = hours * 60 + minutes;
            // Calculate the top position as a percentage of the day height
            const topPercentage = (totalTimeInMinutes / (24 * 60)) * 100;
            return `${topPercentage}%`; */

            // Convert the time to hours since midnight
            const totalTimeInHours = hours + minutes / 60;
            // Calculate the top position
            const topDistance = totalTimeInHours * 30 + 50;
            return `${topDistance}px`;
        }

        // Function to calculate height
        function calculateHeight(start, end) {
            // Split the start and end times into hours and minutes
            const [startHours, startMinutes] = start.split(':').map(Number);
            const [endHours, endMinutes] = end.split(':').map(Number);
            // Convert start and end times to minutes since midnight
            const startTimeInMinutes = startHours * 60 + startMinutes;
            const endTimeInMinutes = endHours * 60 + endMinutes;
            // Calculate the height in pixels based on a 30-pixel-per-hour scale
            const heightInPixels = ((endTimeInMinutes - startTimeInMinutes) * 30 / 60);
            return `${heightInPixels}px`;
        }

        // Loop through days of the week and populate events
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        daysOfWeek.forEach(day => {
            const events = data.data[day]; // Use lowercase day name as the key
            const eventContainer = document.getElementById(day); // Use the ID to target the day container
            if (events) {
                events.forEach(event => {
                    const eventElement = createEventElement(event);
                    eventContainer.querySelector('.event-container').appendChild(eventElement);
                });
            }
        });

    })
    .catch(error => console.error('Error fetching data:', error));


// Get the checkbox element
const hideAway = document.getElementById('hideAway');

// Add a change event listener to the checkbox
hideAway.addEventListener('change', () => {
    // Get all "Away" events by their title
    const AwayEvents = document.querySelectorAll('.event');

    // Loop through each "Away" event and toggle its visibility based on the checkbox state
    AwayEvents.forEach(event => {
        const eventTitle = event.textContent.toLowerCase();
        if (eventTitle.includes('away') || eventTitle.includes('sleep')) {
            // Toggle the "display" property to show or hide the event based on checkbox state
            event.style.display = hideAway.checked ? 'none' : 'block';
        }
    });
});
