// popup.js

document.addEventListener('DOMContentLoaded', function () {

    var applyButton = document.getElementById('applyTimeRange');
  
    if(applyButton){
      applyButton.addEventListener('click', async function () {
        var start = document.getElementById('startTime');
        console.log(start.value);
        var finish = document.getElementById('finishTime');
        console.log("finish" + finish.value);
        var startTime = parseFloat(start.value);
        var finishTime = parseFloat(finish.value);
    
        if (!isNaN(startTime) && !isNaN(finishTime) && startTime < finishTime) {
          let queryOptions = { active: true, currentWindow: true };
          let tab = await chrome.tabs.query(queryOptions);
        
          await chrome.tabs.sendMessage(
            tab[0].id,
            { startTime: startTime, finishTime: finishTime },
            function (response) {
              if(response)
              console.log(response);
            }
          );
        } else {
          alert('Invalid time range. Make sure the start time is less than the finish time.');
        }
      });
    }
  });

  