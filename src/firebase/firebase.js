import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyASWOqUppmRp0XFVb8uw8RTHbiVnJ6E_xY",
  authDomain: "asesmen-hr.firebaseapp.com",
  databaseURL: "https://asesmen-hr.firebaseio.com",
  projectId: "asesmen-hr",
  storageBucket: "asesmen-hr.appspot.com",
  messagingSenderId: "661722095498"
  // apiKey: "AIzaSyAJOo0Jn1KL4o9EAGg8tEioz-JRBBldLGg",
  // authDomain: "assesment-803ef.firebaseapp.com",
  // databaseURL: "https://assesment-803ef.firebaseio.com",
  // projectId: "assesment-803ef",
  // storageBucket: "assesment-803ef.appspot.com",
  // messagingSenderId: "644831776631",
  // appId: "1:644831776631:web:95063c632c9efaff"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  cekuser = () => this.auth.currentUser;

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  doLogin = (nip, password) => 
  this.ceklogin(nip, password);
  
  // *** Merge Auth and DB User API *** //

  // onAuthUserListener = (next, fallback) =>
  // this.auth.onAuthStateChanged(authUser => {
  //   if (authUser) {
  //     this.user(authUser.uid)
  //     .get()
  //       .then(snapshot => {
  //         const dbUser = snapshot.data();
  //         // default empty roles
  //         if (!dbUser.roles) {
  //           dbUser.roles = [];
  //         }

  //         // merge auth and db user
  //         authUser = {
  //           uid: authUser.uid,
  //           email: authUser.email,
  //           ...dbUser,
  //         };
  //         next(authUser);
  //       });
  //   } else {
  //     fallback();
  //   }
  // });

  doesUserExist (username) {
    return !(this.users[username] === undefined)
  }
  // *** User API ***

  user = uid => this.db.collection(`user`).doc(`${uid}`);

  users = () => this.db.collection('user');

  useradd = () => this.db.collection('user');
  
  ceklogin = (nip, password) => this.users().onSnapshot(querySnapshot=>{
    var data = []
      querySnapshot.forEach((doc)=>{
        let item = data
        item.push({
          data : doc.data(),
        })
      })
  })
    
  // *** Message API ***

  
  kompetenModel = uid => this.db.collection(`kompetens`).doc(`${uid}`)
  
  kompetens = () => this.db.collection('kompetens');

  kompetensJabatan = uid => this.db.collection(`kompetens`).doc(`${uid}`).collection(`jabatan`);
  
  kompetenJabatan = (uid, uidJabatan) => this.db.collection('kompetens').doc(`${uid}`).collection(`jabatan`).doc(`${uidJabatan}`)
  
  kompeten = (uid, uidJabatan) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`jabatan`).doc(`${uidJabatan}`).collection(`cluster`);

  kompetenCluster = (uid, uidJabatan, uidCluster) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`jabatan`).doc(`${uidJabatan}`).collection(`cluster`).doc(`${uidCluster}`);

  kompetensi = (uid, uidJabatan, uidCluster) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`jabatan`).doc(`${uidJabatan}`).collection(`cluster`).doc(`${uidCluster}`).collection(`nama_kompetensi`);

  kompetensiRange = (uid, uidJabatan, uidCluster, uidKompetensi) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`jabatan`).doc(`${uidJabatan}`).collection(`cluster`).doc(`${uidCluster}`).collection(`nama_kompetensi`).doc(`${uidKompetensi}`);
  
  // kompeten = uid => this.db.collection(`kompetens`).doc(`${uid}`).collection(`cluster`);

  // kompetenCluster = (uid, uidCluster) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`cluster`).doc(`${uidCluster}`)

  
  // kompetensiRange = (uid, uidCluster, uidKompetensi) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`cluster`).doc(`${uidCluster}`).collection(`kompetensi`).doc(`${uidKompetensi}`);

  kompetensiLevel = (uid, uidCluster, uidKompetensi) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`cluster`).doc(`${uidCluster}`).collection(`kompetensi`).doc(`${uidKompetensi}`).collection(`level`);

  kompetensiLevelRequirment = (uid, uidCluster, uidKompetensi, idLevel) => this.db.collection(`kompetens`).doc(`${uid}`).collection(`cluster`).doc(`${uidCluster}`).collection(`kompetensi`).doc(`${uidKompetensi}`).collection(`level`).doc(`${idLevel}`);

  UserHasil = (uid) => this.db.collection(`user`).doc(`${uid}`).collection(`Threshold`);
  
  jabatans = () => this.db.collection('jabatans');

  jabatan = uid => this.db.collection('jabatans').doc(`${uid}`)
  
  wilayahs = () => this.db.collection('wilayahs');

  wilayah = uid => this.db.collection('wilayahs').doc(`${uid}`)

  roles = () => this.db.collection('roles');
  
  role = uid => this.db.collection('roles').doc(`${uid}`)

  pesan = () => this.db.collection(`pesan`)

  pesanid = uid => this.db.collection(`pesan`).doc(`${uid}`)
  
  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');
}

export default Firebase;
