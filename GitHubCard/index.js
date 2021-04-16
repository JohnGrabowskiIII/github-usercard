// IMPORT AXIOS
import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

// AXIOS GET MY PROFILE, CALL CARDADDER, AND APPEND TO PAGE
axios.get('https://api.github.com/users/johngrabowskiiii')
  .then(res => cardAdder(res.data))
  .catch(err => {
    console.log(err);
  })

  // FUNCTION THAT TAKES USER DATA AND APPENDS TO CORRECT SPOT ON PAGE
  function cardAdder(eData) {
    const cardsSection = document.querySelector('div.cards');
    cardsSection.appendChild(userCard(eData));
  }

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'];

// TAKES AN ARRAY OF USERNAMES AND CALLS CARDADDER FOR EACH ONE
function followerAdder(array) {
  array.forEach(cb => {
    console.log(cb);
    axios.get(`https://api.github.com/users/${cb}`)
      .then(res => cardAdder(res.data))
      .catch(err => console.log(err));
  })
}

// CALL FUNCTION TO APPEND DEFAULT FOLLOWERS TO PAGE
followerAdder(followersArray);

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

// FUNCTION BUILDS DOM NODES FOR USERCARDS
function userCard(userObj) {

  // DECLARE FUNCTIONS FOR MOST CREATED ELEMENTS
  const divMaker = () => document.createElement('div');
  const pTagMaker = () => document.createElement('p');

  // DEFINE ALL ELEMENTS THAT USERCARD NEEDS TO BUILD
  // CALLING NAME() RETURNS DOM NODE
  const elementObject = {
    cardHolderDiv: () => {
      const newDiv = divMaker();
      newDiv.classList.add('card');
      return newDiv;
    },
    userImg: () => {
      const newImg = document.createElement('img');
      newImg.setAttribute('src', userObj.avatar_url);
      return newImg;
    },
    cardInfoDiv: () => {
      const newDiv = divMaker();
      newDiv.classList.add('card-info');
      return newDiv;
    },
    userName: () => {
      const hThree = document.createElement('h3');
      hThree.classList.add('name');
      hThree.textContent = userObj.name;
      return hThree;
    },
    gitHubName: () => {
      const pName = pTagMaker();
      pName.classList.add('username');
      pName.textContent = userObj.login;
      return pName;
    },
    location: () => {
      const pLocation = pTagMaker();
      pLocation.textContent = `Location: ${userObj.location}`;
      return pLocation;
    },
    profile: () => {
      const pProfile = pTagMaker();
      pProfile.textContent = 'Profile:';
      return pProfile;
    },
    linkToProfile: () => {
      const aLink = document.createElement('a');
      aLink.setAttribute('href', userObj.html_url);
      aLink.textContent = `${userObj.html_url}`;
      return aLink;
    },
    followers: () => {
      const pFollower = pTagMaker();
      pFollower.textContent = `Followers: ${userObj.followers}`;
      return pFollower;
    },
    following: () => {
      const pFollowing = pTagMaker();
      pFollowing.textContent = `Following: ${userObj.following}`;
      return pFollowing;
    },
    bio: () => {
      const pBio = pTagMaker();
      pBio.textContent = `Bio: ${userObj.bio}`;
      return pBio;
    }
  }

  // FUNCTION CALLS ELEMENTOBJECTS AND APPENDS THEM IN CORRECT ORDER
  const nodeBuilder = () => {

    // NODES WITH CHILDREN NEED TO BE DECLARED AS VARIABLES
    const holder = elementObject.cardHolderDiv();
    const infoSection = elementObject.cardInfoDiv();
    const linkHolder = elementObject.profile();

    // START TOP LAYER OF NEST
    holder.appendChild(elementObject.userImg());
    holder.appendChild(infoSection);

    // START CENTER LAYER OF NEST
    infoSection.appendChild(elementObject.userName());
    infoSection.appendChild(elementObject.gitHubName());
    infoSection.appendChild(elementObject.location());
    infoSection.appendChild(linkHolder);

    // CREATE DEEPEST LAYER OF NEST
    linkHolder.appendChild(elementObject.linkToProfile());

    // FINISH CENTER LEVEL OF NEST
    infoSection.appendChild(elementObject.followers());
    infoSection.appendChild(elementObject.following());
    infoSection.appendChild(elementObject.bio());

    // RETURN TOP MOST DOM NODE
    return holder;
  }

  // CALL NODEBUILDER AND RETURN THE NODE
  return nodeBuilder();
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
