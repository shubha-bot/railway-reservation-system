document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const trainDataRaw = localStorage.getItem("selectedTrain");
  if (!trainDataRaw) {
    alert("No train selected. Please select a train first.");
    return;
  }

  let trainData;
  try {
    trainData = JSON.parse(trainDataRaw);
  } catch (err) {
    alert("Error reading selected train data.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value.trim(), 10);
  const gender = document.getElementById("gender").value;
  const coach = document.getElementById("coach").value;

  if (!name || isNaN(age) || age <= 0 || !gender || !coach) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const passenger = {
    train_no: trainData.train_no,
    train_name: trainData.name,
    from: trainData.from,
    to: trainData.to,
    departure: trainData.departure,
    arrival: trainData.arrival,
    name: name,
    age: age,
    gender: gender,
    coach: coach
  };

  fetch("php/book_ticket.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(passenger)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Booking Confirmed!\nThank you, " + passenger.name);
        window.location.href = "booking_status.html";
      } else {
        alert("Booking failed: " + (data.message || "Unknown error"));
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while booking. Please try again.");
    });
});
