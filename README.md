# File Uploader

### Installation
* git clone https://github.com/AparnaPrasad/file-uploader.git
* npm i 
* npm start - to run the application
* npm test - to run the test cases

Tested with node v10 and v12

### Demo
![alt text](http://g.recordit.co/EACBQ45s3X.gif)

### Implemented Features

1. Add files and Start transfer
2. Transfer loader
3. Cancel transfer in progress
4. On cancel, see an alert that transfer was cancelled
5. On error during transfer see an slert 
6. On successful transfer, option to start another transfer
7. Unit test cases - 51
8. Have used http://www.mocky.io mock API for file transfer API

### Improvements 
1. Use localization tool lile react native to pluralize words, currently done with a function
2. Improve styling

### Libraries used
- React, Redux
- Typescript for type safety
- jest and enzyme for testing
- react-bootstrap component library
- styled-components for styling
- react-dropzone for file upload
- http://www.mocky.io mocj API


