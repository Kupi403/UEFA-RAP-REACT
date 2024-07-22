function isIOSDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod/.test(userAgent) && !window.MSStream;
}

export default isIOSDevice