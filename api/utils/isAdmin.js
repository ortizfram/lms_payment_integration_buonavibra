
const adminEmails = JSON.parse(process.env.ADMIN_EMAILS);

export const isAdmin = async() =>{
    let isAdmin = false;

    // Check if email is admin
    if (adminEmails.includes(req.user.email)) {
        isAdmin = true;
      }

    return isAdmin
}