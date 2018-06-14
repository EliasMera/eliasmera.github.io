function clickHandler() {
        var words = (function(){
        var sWords = document.getElementById("tArea").value.toLowerCase().trim().replace(/[\".,\/#!?¿¡$%\^&\*;:{}=\-_`~()]/g,'').split(/[\s\/]+/g).sort();
        var iWordsCount = sWords.length;
        var ignore = [];
        //['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if'];
        ignore = (function(){
            var o = {}; 
            var iCount = ignore.length;
            for (var i=0;i<iCount;i++){
                o[ignore[i]] = true;
            }
            return o;
        }());

        var counts = {};
        for (var i=0; i<iWordsCount; i++) {
            var sWord = sWords[i];
            if (!ignore[sWord]) {
                counts[sWord] = counts[sWord] || 0;
                counts[sWord]++;
            }
        }

        var arr = []; 
        for (sWord in counts) {
            arr.push({
                text: sWord,
                frequency: counts[sWord]
            });
        }

        return arr.sort(function(a,b){
            return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
        });

    }());

    (function(){
        var iWordsCount = words.length; 
        var tt = document.getElementById("myT");
        tt.innerHTML = "";
        var htmlToAppend = "<thead><tr><th>Word</th><th>Frequency</th><th>Word Length</th></tr></thead><tbody>";
        let csvContent = "data:text/csv;charset=utf-8,Word,Frequency,Word Length\r\n";
        for (var i=0; i<iWordsCount; i++) {
            var word = words[i];
            console.log(word.frequency, word.text);
            htmlToAppend += "<tr><td>" + word.text + "</td><td>" + word.frequency + "</td><td>" + word.text.length + "</td></tr>";
            csvContent += word.text + "," + word.frequency + "," + word.text.length + "\r\n";
        }
        tt.innerHTML = htmlToAppend + "</tbody>";
        var encodedUri = encodeURI(csvContent);
        // deletes already created link
        var element = document.getElementsByTagName("a"), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
        $('#myT').DataTable({
            responsive: true
        });
        // creates new link
        var link = document.createElement("a");
        link.setAttribute("class", "text-center");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        link.innerHTML= "Download file";
        document.body.appendChild(link);

        //link.click();
    }());
}