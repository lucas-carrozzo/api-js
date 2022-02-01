
function userView(user) {
    return {
        id: user.id,
        fullname: `${user.first_name} ${user.last_name}`,
        email: user.email,
    }
}

module.exports = {
    userView,
}