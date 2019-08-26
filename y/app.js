const db = firebase.firestore();

const ulList = document.getElementById("list");



//const MyPosts=db.collection('controller').doc('Raspberry Pi 1');


dbRef = firebase.database().ref('Data');


var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function (snap) {
    if (snap.val() === true) {
        console.log("connected");
    } else {
        console.log("not connected");
    }
});


dbRef.on('value', snap => {


});

dbRef.on('child_added', snap => {
    //console.log(snap.val());




    snap.child('Time').forEach(time => {


        console.log(time.key);

        const uli_time = document.createElement('li');
        uli_time.className = 'list-group-item-info';
        uli_time.id = time.key;

        if (time.val() == parseInt((Date.now()) / 1000)) {
            //console.log("Device is Online");

            uli_time.innerText = "Device is Online";
            ulList.appendChild(uli_time);


        } else if (time.val() !== parseInt((Date.now()) / 1000)) {
            uli_time.innerText = "Device is Offline";
            ulList.appendChild(uli_time);
        }
        //console.log(parseInt((Date.now())/1000));
    });


    snap.child('RaspberryPi').forEach(snapPi => {



        //console.log("IN RASPBERRY PI LOOP" + snapPi.val());
        //const pli = document.createElement('li');
        const uli = document.createElement('li');
        uli.className = 'list-group-item active';
        uli.innerText = "Raspberry Pi :" + snapPi.val();

        uli.id = snapPi.key;
        ulList.appendChild(uli);

        // const uli = document.createElement('li');
        // uli.className = 'list-group-item-info';


        // snap.child('Doors').forEach(snapdata => {
        //     //console.log("IN DOORS LOOP" + snapdata.val());
        //     const uli = document.createElement('li');
        //     uli.className = 'list-group-item';
        //     uli.innerText = snapdata.key + " : " + snapdata.val();
        //     uli.id = snapdata.key;
        //     ulList.appendChild(uli);

        // });

    });
    snap.child('Doors').forEach(snapdata => {



        //console.log("IN DOORS LOOP" + snapdata.val());
        const uli = document.createElement('li');
        uli.className = 'list-group-item';
        // uli.innerText = snapdata.key + " : " + snapdata.val();
        // uli.id = snapdata.key;
        // ulList.appendChild(uli);
        if (snapdata.val() == 1) {
            uli.innerText = snapdata.key + " : " + 'Open';
            uli.id = snapdata.key;
            ulList.appendChild(uli);
        } else if (snapdata.val() == 0) {
            uli.innerText = snapdata.key + " : " + 'Close';
            uli.id = snapdata.key;
            ulList.appendChild(uli);
        } else {
            uli.innerText = snapdata.key + " : " + snapdata.val();
            uli.id = snapdata.key;
            ulList.appendChild(uli);
        }

    });



});




dbRef.on('child_changed', snap => {



    snap.child('Time').forEach(time => {




        const uli_time = document.getElementById(time.key);

        _time = time.val();
        if (_time == parseInt((Date.now()) / 1000)) {
            uli_time.innerText = "Device is Online";
        } else if (_time !== parseInt((Date.now()) / 1000)) {
            uli_time.innerText = "Device is Offline";
        }
        //console.log(parseInt((Date.now())/1000));
    });

    snap.child('Doors').forEach(snapData => {
        //console.log(snapData.val());

        const liChange = document.getElementById(snapData.key);
        if (snapData.val() == 1) {
            liChange.innerText = snapData.key + " : " + 'Open';

        } else if (snapData.val() == 0) {
            liChange.innerText = snapData.key + " : " + 'Close';

        } else {
            liChange.innerText = snapData.key + " : " + snapData.val();

        }
        //liChange.innerText = snapData.key + " : " + snapData.val();
        //console.log(liChange);
    });




});

dbRef.on('child_removed', snap => {

    snap.child('Doors').forEach(snapData => {

        const liremoved = document.getElementById(snapData.key);
        liremoved.remove();
    });

});






