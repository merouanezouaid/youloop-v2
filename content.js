// Wait for the DOM to be fully loaded or use MutationObserver
if (document.readyState !== "loading") {
  initializeLooper();
} else {
  document.addEventListener("DOMContentLoaded", initializeLooper);
}

function initializeLooper() {
  // Use MutationObserver to wait for the YouTube player elements
  const observer = new MutationObserver(function (mutations, obs) {
    const ytBar = document.querySelector(".ytp-chrome-bottom");
    const duration = document.querySelector(".ytp-time-duration");
    const container = document.getElementById("movie_player");
    const targetElement = document.getElementById("ytp-id-26");
    const rightControls = document.querySelector(".ytp-right-controls");
    const progressBar = document.getElementsByClassName("ytp-progress-bar")[0];

    const timeElements = document.querySelectorAll('#time');


    if (
      duration &&
      container &&
      targetElement &&
      rightControls &&
      ytBar &&
      progressBar
    ) {
      // Elements are now available, execute the main code
      console.log(ytBar);
      myInitCode(
        duration,
        container,
        targetElement,
        rightControls,
        ytBar,
        progressBar
      );
      obs.disconnect(); // Stop observing after the elements are found
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function myInitCode(
  duration,
  container,
  targetElement,
  rightControls,
  ytBar,
  progressBar
) {
  const looperMenu = `<div class="ytp-popup looper" data-layer="6" style="width: 286px; height: 147px; right: 178px;
bottom: 61px;
z-index: 70;
will-change: width,height; display: none;
transition: opacity .1s cubic-bezier(0,0,.2,1);
border-radius: 12px;" id="ytp-id-17">
<div class="ytp-panel" style="width: 286px;
height: 138px;">
  <div class="ytp-panel-menu" role="menu">
    <div class="ytp-menuitem" id="startTimeMenuItem" aria-haspopup="true" role="menuitem" tabindex="0">
      <div class="ytp-menuitem-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.29 17.29c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L16.7 6.7a.996.996 0 0 0-1.41 0c-.38.39-.39 1.03 0 1.42L18.17 11H7c-.55 0-1 .45-1 1s.45 1 1 1h11.17l-2.88 2.88a.996.996 0 0 0 0 1.41zM3 18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1z"/></svg>

      </div>
      <div class="ytp-menuitem-label">
        Start time
      </div>
      <div class="ytp-menuitem-content">
      <input 
      style="height: 16px;
             width: 50px;
             border: none;
             color: #fff;
             background-color: transparent;
             border-radius: 2px;
             font-size: 14px;
             text-align: right;
             outline: none;"
      id="startTime" 
      value="0:00">
    
      </div>
    </div>
    <div class="ytp-menuitem" id="endTimeMenuItem" aria-haspopup="true" role="menuitem" tabindex="0">
      <div class="ytp-menuitem-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="white" d="M2.5 12.5A2.5 2.5 0 0 0 0 15v70a2.5 2.5 0 0 0 2.5 2.5h95A2.5 2.5 0 0 0 100 85V15a2.5 2.5 0 0 0-2.5-2.5zm2.5 5h90v65H5Z" color="white"/><path fill="white" d="M71.668 17.496v16.668h16.664V17.496Zm16.664 16.668v16.664H99V34.164Zm0 16.664H71.668v16.668h16.664zm0 16.668v16.666H99V67.496Zm-16.664 0H55v16.666h16.668Zm-16.668 0V50.832H38.332v16.664zm-16.668 0H21.668v16.668h16.664zm-16.664 0V50.832H5v16.664zm0-16.664h16.664V34.164H21.668Zm0-16.668V17.5H5v16.664zm16.664 0H55V17.5H38.332Zm16.668 0v16.664h16.668V34.164Z" color="white"/></svg>

      </div>
      <div class="ytp-menuitem-label">
        End time
      </div>
      <div class="ytp-menuitem-content">
      <input style="height: 16px;
      width: 50px;
      border: none;
      color: #fff;
      font-weight: normal;
      background-color: transparent;
      border-radius: 2px;
      font-size: 14px;
      text-align: right;
      outline: none;" id="finishTime" value=${duration.textContent}>
      </div>
    </div>
    <div class="ytp-menuitem" style="position: relative; background-color: transparent; cursor: auto; " tabindex="0">
    <div class="ytp-menuitem-icon">

    </div>
    <div class="ytp-menuitem-label">
    <button id="reset" style="padding: 0 12px;
    background-color: transparent;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;">
  Reset
    </button>

    </div>
    <div class="ytp-menuitem-content">
    
    <button id="applyTimeRange" style="padding: 0 31px;
    background-color: transparent;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;">
Loop</button>

    </div>

    </div>
      </div>
    </div>
  </div>
</div>
</div>
`;

  // Get a reference to the container and target element
  console.log(container);

  // Create a new DOM element from the HTML string
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = looperMenu;

  console.log(tempDiv);

  // Insert the new element right next to the target element

  if (targetElement) {
    //container.insertBefore(tempDiv.firstChild, targetElement.nextSibling);
    ytBar.appendChild(tempDiv.firstChild);
  }

  const button = document.createElement("button");
  button.classList.add("ytp-button");
  button.ariaExpanded = false;
  button.setAttribute("title", "loop");

  button.addEventListener("mouseenter", function () {
    // Remove the 'data-custom-attribute' attribute from the target element
    button.removeAttribute("title");
  });

  button.addEventListener("mouseleave", function () {
    // Set the 'data-custom-attribute' attribute value to 'custom-value'
    button.setAttribute("title", "loop");
  });

  button.ariaHasPopup = "true";
  button.ariaLabel = "Loop";
  button.setAttribute("data-tooltip-text", "Loop");
  button.setAttribute("data-tooltip-target-id", "ytp-settings-button");
  button.setAttribute("data-tooltip-text", "Loop");
  button.setAttribute("aria-controls", "ytp-id-18");
  button.setAttribute("data-title-no-tooltip", "Loop");

  button.innerHTML = `
<svg width="55%" height="100%" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 2.22662V0.487327C9 0.0500746 8.3925 -0.163693 8.04375 0.147242L4.89375 2.85821C4.66875 3.05254 4.66875 3.35376 4.89375 3.5481L8.0325 6.25906C8.3925 6.56028 9 6.34651 9 5.90926V4.16997C12.7237 4.16997 15.75 6.78376 15.75 10C15.75 10.7676 15.5812 11.5158 15.255 12.1863C15.0862 12.5361 15.21 12.9345 15.5138 13.1968C16.0875 13.6924 17.055 13.5175 17.3588 12.8664C17.775 11.9822 18 11.0105 18 10C18 5.70521 13.9725 2.22662 9 2.22662ZM9 15.83C5.27625 15.83 2.25 13.2162 2.25 10C2.25 9.23238 2.41875 8.48419 2.745 7.81374C2.91375 7.46394 2.79 7.06555 2.48625 6.8032C1.9125 6.30764 0.945 6.48255 0.64125 7.13357C0.225 8.01779 0 8.98946 0 10C0 14.2948 4.0275 17.7734 9 17.7734V19.5127C9 19.9499 9.6075 20.1637 9.95625 19.8528L13.095 17.1418C13.32 16.9475 13.32 16.6462 13.095 16.4519L9.95625 13.7409C9.87694 13.6738 9.7764 13.6284 9.66729 13.6106C9.55818 13.5927 9.44538 13.6031 9.34312 13.6405C9.24086 13.6779 9.1537 13.7406 9.09264 13.8208C9.03158 13.9009 8.99935 13.9948 9 14.0907V15.83Z" fill="#F2F2F2"/>
</svg>

`;

  rightControls.insertBefore(button, rightControls.firstChild);

  listener = false;

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request);
    if (request) {
      var startTime = request.startTime;
      var finishTime = request.finishTime;
      var video = document.querySelector("video");

      // Function to set up the timeupdate event listener
      function setupTimeUpdateListener() {
        try {
          video.addEventListener("click", onTimeUpdate);
        } catch (e) {
          console.log(e);
        }
      }

      // Function to remove the timeupdate event listener
      function removeTimeUpdateListener() {
        try {
          video.removeEventListener("click", onTimeUpdate);
        } catch (e) {
          console.log(e);
        }
      }

      // Function to handle time updates
      function onTimeUpdate() {
        console.log("timeupdate ", video.currentTime, finishTime);
        if (video.currentTime >= finishTime) {
          console.log(video.currentTime, finishTime);
          video.currentTime = startTime;
        }
      }

      if (video) {
        setupTimeUpdateListener(); // Set up the new event listener
      }

      sendResponse({ status: "done" });
    }
  });

  const looper = document.getElementsByClassName("looper")[0];
  button.addEventListener("click", function () {
    //alert("wtf");
    // Toggle the menu visibility
    try {
      container.classList.add("ytp-settings-shown");
      container.classList.remove("ytp-autohide");
      if (looper.style.display === "none") {
        looper.style.display = "block";
      } else {
        looper.style.display = "none";
      }
    } catch (e) {
      alert(e);
    }
  });

  function convertSeconds(duration) {
    // your input string
    var a = duration.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 + +a[1];

    return seconds;
  }

  function convertToMinutesSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Padding with zero if necessary to ensure always having two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // TODO: MAKE IT WORK :)

  var applyButton = document.getElementById("applyTimeRange");
  var resetButton = document.getElementById("reset");

  var loopListener; // This variable will hold the reference to the loop event listener

  if (applyButton) {
    applyButton.addEventListener("click", async function () {
      var start = document.getElementById("startTime");
      var finish = document.getElementById("finishTime");
      var startTime = parseFloat(convertSeconds(start.value));
      var finishTime = parseFloat(convertSeconds(finish.value));
      var video = document.querySelector("video");

      if (
        !isNaN(startTime) &&
        !isNaN(finishTime) &&
        startTime < finishTime &&
        video
      ) {
        // Remove any existing listener to avoid duplicates
        if (loopListener) {
          video.removeEventListener("timeupdate", loopListener);
        }

        // Update the loop listener with new start and finish times
        loopListener = function () {
          if (video.currentTime >= finishTime) {
            video.currentTime = startTime;
          }
        };

        // Add the updated listener
        video.addEventListener("timeupdate", loopListener);
        video.currentTime = startTime; // Set the video to start at the new startTime
      } else {
        alert(
          "Invalid time range. Make sure the start time is less than the finish time."
        );
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      var video = document.querySelector("video");

      // Remove the loop event listener
      if (loopListener) {
        video.removeEventListener("timeupdate", loopListener);
        loopListener = null; // Clear the reference
      }

      // Optionally, reset video to start
      video.currentTime = 0;
      document.getElementById("startTime").value = "0:00";
      document.getElementById("finishTime").value = duration.textContent;

      console.log("Looping reset and video reset to start.");
    });
  }

  // TODO: use the progress bar to select start and end time

  let activeTimeSelection = null;
  let currentlyClickedItem = null;
  const startItem = document.getElementById("startTimeMenuItem");
  const endItem = document.getElementById("endTimeMenuItem");

  const clickedStyle = {
    backgroundColor: "#ffffff30", // Example: change background color when clicked
    // Add other styles if necessary
  };

  function applyClickedStyle(element) {
    for (const property in clickedStyle) {
      element.style[property] = clickedStyle[property];
    }
  }

  function removeClickedStyle(element) {
    for (const property in clickedStyle) {
      element.style[property] = ""; // Resetting the style
    }
  }

  startItem.addEventListener("click", function () {
    activeTimeSelection = "start";
    if (currentlyClickedItem) {
      removeClickedStyle(currentlyClickedItem);
    }

    // Apply style to the newly clicked item
    applyClickedStyle(this);
    currentlyClickedItem = this;
  });

  endItem.addEventListener("click", function () {
    activeTimeSelection = "end";
    if (currentlyClickedItem) {
      removeClickedStyle(currentlyClickedItem);
    }

    // Apply style to the newly clicked item
    applyClickedStyle(this);
    currentlyClickedItem = this;
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".ytp-menuitem") && currentlyClickedItem) {
      removeClickedStyle(currentlyClickedItem);
      activeTimeSelection = null;
      currentlyClickedItem = null;
    }
  });

  progressBar.addEventListener("click", function (event) {
    // Assuming progressBar.ariaValueNow gives the time in seconds
    let selectedTimeInSeconds = parseInt(progressBar.ariaValueNow, 10);
    let selectedTime = convertToMinutesSeconds(selectedTimeInSeconds);

    const startTimeInput = document.getElementById("startTime");
    const finishTimeInput = document.getElementById("finishTime");

    if (activeTimeSelection === "start") {
      // Convert finish time to seconds for comparison
      let finishTimeInSeconds = convertSeconds(finishTimeInput.value);

      if (
        selectedTimeInSeconds < finishTimeInSeconds ||
        finishTimeInput.value === ""
      ) {
        startTimeInput.value = selectedTime;
      }
    } else if (activeTimeSelection === "end") {
      // Convert start time to seconds for comparison
      let startTimeInSeconds = convertSeconds(startTimeInput.value);

      if (
        selectedTimeInSeconds > startTimeInSeconds ||
        startTimeInput.value === ""
      ) {
        finishTimeInput.value = selectedTime;
      }
    }
  });
}



// TODO: change to AWS EC3 instance - lambda - S3