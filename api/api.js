import axios from "axios";

async function getUser(accessToken) {
  const requestOptions = {
    url: "https://api.pipedrive.com/v1/users/me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };

  const userInfo = await axios(requestOptions);
  return userInfo.data;
}

async function addDeal(title, accessToken) {
  const requestOptions = {
    url: `https://api.pipedrive.com/v1/deals`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      title,
    }
  };

 return await axios(requestOptions).then( (res)=> res.data );
}

async function addNote(text,dealId, accessToken) {
  const requestOptions = {
    url: `https://api.pipedrive.com/v1/notes`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      deal_id:dealId,
      content:text
    },
  };
  return await axios(requestOptions).then( (res)=> res.data );
}


export default  {
  getUser,
  addNote,
  addDeal
};
