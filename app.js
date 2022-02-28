const allPhones = () => {
    document.getElementById("phone-container").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    const searchValue = document.getElementById("search-box").value;
  
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.phone == null);
        if (data.phone == null) {
          document.getElementById("spinner").style.display = "block";
        } else {
          showPhoneDetails(data.phone);
          document.getElementById("spinner").style.display = "none";
        }
      });
  };

