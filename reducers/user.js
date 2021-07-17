import users from '../posts/user.json';
import mails from '../posts/mails.json';
import mailThread from '../posts/mailThread.json';

export const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const SET_INBOX = 'SET_INBOX'
export const SET_STARRED = 'SET_STARRED'
export const SET_SENT = 'SET_SENT'
export const SET_TRASH = 'SET_TRASH';

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

const initialInbox = (uid) => {
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isDelete == false)
  return dataFilter
}

const initialStar = (uid) => {
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isStarred == true)
  return dataFilter
}

const initialSent = (uid) => {
  const data = mailThread.mailThreads.filter(thread => thread.hostOfuid == uid);
  const dataFilter = data.filter(d => d.isDelete == false)
  return dataFilter
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
        mailLists: mails.mails,
        userLists: users.users
      }
  }
};

export default user;