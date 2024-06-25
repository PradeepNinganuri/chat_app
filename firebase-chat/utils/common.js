export const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const getRoomId=(userId1,userId2)=>{
    //it wiil create a logic to combine the userids
    const sortedIds =[userId1,userId2].sort();
    //join the sorted user ids with dash
    const roomId=sortedIds.join('-');
    return roomId;


}
//we need to get the same room id for both users.
// if user1 has abc id and user 2 has xyz id this fun return abc-xyz id
// using that room id you can get the same messages