import users from '../user.json';
import mails from '../mails.json';
import mailThread from '../mailThread.json';

export const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const SET_INBOX = 'SET_INBOX'
export const SET_STARRED = 'SET_STARRED'
export const SET_SENT = 'SET_SENT'
export const SET_TRASH = 'SET_TRASH';
export const SET_MLIST = 'SET_MLIST'
export const SET_MTHLIST = 'SET_MTHLIST'

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
})

export const setInbox = (inbox) => ({
  type: SET_INBOX,
  payload: inbox,
})

export const setStarred = (starred) => ({
  type: SET_STARRED,
  payload: starred,
})

export const setSent = (sent) => ({
  type: SET_SENT,
  payload: sent,
})

export const setTrash = (trash) => ({
  type: SET_TRASH,
  payload: trash,
})

export const setMailLists = (mailLists) => ({
  type: SET_MLIST,
  payload: mailLists,
})

export const setMailThreadLists = (mailThreadLists) => ({
  type: SET_MTHLIST,
  payload: mailThreadLists,
})

const initialInbox = (uid) => {
  let result = []
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isDelete == false)

  var cnt = 0
  for(var i in dataFilter) {
    for(var j in dataFilter[i].mails) {
      const selectMail = mails.mails.filter(list => list.uid == dataFilter[i].mails[j].uid);
      if(selectMail[0].senderOfuid == uid) {
        cnt = 1
        break;
      }
    }
    if(cnt == 1) {
      const cp = [...dataFilter]
      const index = cp.findIndex(x => x.uid === dataFilter[i].uid)
      cp.splice(index, 1)
      result = [...cp]
    }
    cnt = 0;
  }
  
  return result
}

const initialStar = (uid) => {
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isStarred == true)
  return dataFilter
}

const initialSent = (uid) => {
  let result = []
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isDelete == false)

  var cnt = 0
  for(var i in dataFilter) {
    for(var j in dataFilter[i].mails) {
      const selectMail = mails.mails.filter(list => list.uid == dataFilter[i].mails[j].uid);
      if(selectMail[0].senderOfuid == uid) {
        cnt = 1
        break;
      }
    }
    if(cnt == 0) {
      const cp = [...dataFilter]
      const index = cp.findIndex(x => x.uid === dataFilter[i].uid)
      cp.splice(index, 1)
      result = [...cp]
    }
    cnt = 0;
  }

  return result
}

const initialTrash = (uid) => {
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isDelete == true)
  return dataFilter
}

const initialState = {
  userProfile: {
    email: users.users[0].email,
    name: users.users[0].name,
    firstOfName: users.users[0].firstOfName,
    uid: users.users[0].uid
  },
  inbox: initialInbox(users.users[0].uid),
  starred: initialStar(users.users[0].uid),
  sent: initialSent(users.users[0].uid),
  trash: initialTrash(users.users[0].uid),
  mailThreadLists: mailThread.mailThreads,
  mailLists: mails.mails,
  userLists: users.users
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload
      }
    }

    case SET_INBOX:{
      return {
        ...state,
        inbox: action.payload,
      }
    }

    case SET_STARRED: {
      return {
        ...state,
        starred: action.payload
      }
    }

    case SET_SENT: {
      return {
        ...state,
        sent: action.payload
      }
    }

    case SET_TRASH: {
      return {
        ...state,
        trash: action.payload
      }
    }
    
    case SET_MLIST: {
      return {
        ...state,
        mailLists: action.payload
      }
    }

    case SET_MTHLIST: {
      return {
        ...state,
        mailThreadLists: action.payload
      }
    }

    default:
      return {
        state,
        userProfile: {
          email: users.users[0].email,
          name: users.users[0].name,
          firstOfName: users.users[0].firstOfName,
          uid: users.users[0].uid
        },
        inbox: initialInbox(users.users[0].uid),
        starred: initialStar(users.users[0].uid),
        sent: initialSent(users.users[0].uid),
        trash: initialTrash(users.users[0].uid),
        mailThreadLists: mailThread.mailThreads,
        mailLists: mails.mails,
        userLists: users.users
      }
  }
};

export default user;