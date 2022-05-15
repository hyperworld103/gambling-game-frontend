function addPost(post) {
    return {
        type: "ADD_POST",
        payload: { 
            type:post.type,
            walletKey:post.walletKey,
            totalRedAmount:post.totalRedAmount,
            totalGreenAmount:post.totalGreenAmount,
            red_history:post.red_history,
            green_history:post.green_history
        }
    }
}

export { addPost }