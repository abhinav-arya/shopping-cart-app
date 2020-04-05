import $ from 'jquery'

// Get Shopping List data from the service API
export default function getShoppingList() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'https://api.myjson.com/bins/qzuzi',
            format: 'json',
            cache: false,
            success: (response) => {
                resolve(response)
            },
            error: (error) => {
                reject(error)
            }
        })
    })
}