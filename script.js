//all elements on the page who needs update
const cpuVal = document.getElementById("cpu-val");
const cpuBar = document.getElementById("cpu-bar");
const ramval = document.getElementById("ram-val");
const ramBar = document.getElementById("ram-bar");
const tempVal = document.getElementById("temp-val");
const diskVal = document.getElementById("disk-val");
const diskFree = document.getElementById("disk-free");

//change color when high load
function getBarColor(percentage){
    if (percentage > 85) return '#ef4444'; //red
    if (percentage > 60) return '#eab308'; //yellow
    return '#3b82f6'; //blue
}

function fetchServerData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/stats", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
                
                // Обновляем текст
                cpuVal.textContent = data.cpu + '%';
                ramval.textContent = data.ram + '%';
                tempVal.textContent = data.temp + '°C';
                diskVal.textContent = data.disk + '%';
                diskFree.textContent = data.freeSpace;

                // Обновляем полоски
                cpuBar.style.width = data.cpu + '%';
                cpuBar.style.backgroundColor = getBarColor(data.cpu);

                ramBar.style.width = data.ram + '%';
                ramBar.style.backgroundColor = getBarColor(data.ram);
                
                if (data.temp > 70) {
                    tempVal.style.color = '#ef4444';
                } else {
                    tempVal.style.color = '#ffffff';
                }
            } catch (e) {
                console.error("Ошибка:", e);
            }
        }
    };
    xhr.send();
}
    fetchServerData();
    setInterval(fetchServerData, 1000);