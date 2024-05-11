const { createApi } = require("unsplash-js");

// Replace 'your-access-key' and 'your-secret' with your actual Unsplash access key and secret
const accessKey = "fk3wvnIsTbubtXo5RlFsrQv3RRMkAZOC0wxsFlCcSAg";
const secret = "gFcwYOytKyYpdgx4SZC1W3KKpPXrIrXzwZ9zHe-n54k";

// Initialize Unsplash
const unsplash = createApi({
  accessKey: "fk3wvnIsTbubtXo5RlFsrQv3RRMkAZOC0wxsFlCcSAg",
});

// Function to fetch a random photo
async function getRandomPhoto() {
  unsplash.search
    .getPhotos({
      query: "cat",
      page: 1,
      perPage: 10,
      orientation: "landscape",
    })
    .then((result) => {
      if (result.errors) {
        // handle error here
        console.log("error occurred: ", result.errors);
      } else {
        // handle success here
        const photo = result.response;
        console.log(photo.results[0].urls.full);
      }
    });
}

// Call the function
getRandomPhoto();
