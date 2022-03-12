const CopyToClipboard =(id)=>{
    var element = document.getElementById(id);
    element.disabled = false;
    element.select();
    document.execCommand("Copy");
    element.disabled = true;
    window.getSelection().removeAllRanges()
  }

export default CopyToClipboard;