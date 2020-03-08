export function bytesToSize(bytes: number) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = Math.floor(Math.log(bytes) / Math.log(1024));
   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function getFileType(fileType: string) {
    let index = fileType.lastIndexOf('/');
    
    return fileType.substring(index + 1);
}