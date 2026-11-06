

export const validateEditData = (name,age,gender,photoUrl)=>{
    const data = {
        name,age,gender,photoUrl
    }

    if(age<18) return null;
    if(!["male","female","others"].includes(gender)) return null;

    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([,value])=>value!=null && String(value).trim()!=="")
    );

    return filteredData;
}