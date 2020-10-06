class Users {
  _users = [
    {
      id: 1,
      name: '남준호',
      nickname: '준호',
      community: '낙성대명상공동체',
      email: 'junho@gmail.com',
      emailOpen: 'on',
      mobile: '010-1111-1111',
      mobileOpen: 'on',
      profileUrl: '/assets/mock/profile1.jpeg',
      status: '사는 동안 즐겁게',
    },
    {
      id: 2,
      name: '황규온',
      nickname: '규온',
      community: '생태마을공동체',
      email: 'onssss@gmail.com',
      emailOpen: 'off',
      mobile: '010-4444-5555',
      mobileOpen: 'on',
      profileUrl: '/assets/mock/profile4.jpeg',
      status: '천국으로 가는 길~~',
    },
    {
      id: 3,
      name: '하서영',
      nickname: '쏘울',
      community: '기웃기웃',
      email: 'soul@gmail.com',
      emailOpen: 'on',
      mobile: '010-9999-9999',
      mobileOpen: 'on',
      profileUrl: '/assets/mock/profile12.jpeg',
      status: '쏘울충만 즐거워용',
    },
    {
      id: 4,
      name: '이지혜',
      nickname: '이자',
      community: '진강산마을공동체',
      email: 'lsa@gmail.com',
      emailOpen: 'off',
      mobile: '010-2222-2222',
      mobileOpen: 'off',
      profileUrl: '/assets/mock/profile2.jpeg',
      status: '가는거야~!',
    },
    {
      id: 5,
      name: '이상철',
      nickname: '상자',
      community: '생태마을공동체',
      email: 'sangsang@gmail.com',
      emailOpen: 'on',
      mobile: '010-3333-3333',
      mobileOpen: 'off',
      profileUrl: '/assets/mock/profile3.jpeg',
      status: '레알 리버!',
    },
  ]

  currentUserId = 2

  getCurrentUserId() {
    return this.currentUserId
  }

  getUsers() {
    return this._users
  }

  predicate = (id) => (u) => id === u.id

  findIndex(id) {
    return this._users.findIndex(this.predicate(id))
  }

  get(id) {
    return this._users.find(this.predicate(id))
  }

  replace(id, user) {
    const index = this.findIndex(id)

    if (index < 0) {
      return false
    }

    this._users[index] = { ...user }
    return true
  }

  update(id, user) {
    const index = this.findIndex(id)

    if (index < 0) {
      return false
    }

    this._users[index] = { ...this._users[index], ...user }
    return true
  }

  insert(user) {
    user.id = this._users.lastItem.id + 1

    return this._users.push(user)
  }

  delete(id) {
    const index = this.findIndex(id)

    if (index < 0) {
      return false
    }

    this._users.splice(index, 1)
    return true
  }
}

const users = new Users()

module.exports = {
  users: users,
}
