//check if document is ready
let stateCheck = setInterval(() => {
  if(document.readyState ==='complete'){
    pageInit();
    // createTestingVersion();
    document.querySelector('#frmRegistration').addEventListener('submit', printForm);
    clearInterval(stateCheck);
  }
}, 100);

// Remove an element
function removeElement(id)
{
    if(typeof id === "object")
        return id.parentNode.removeChild(id);
    else
        return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}
// Hide an element
function hideElement(id) { 
  if(typeof id === "object")
    id.style.display = 'none';
else
    document.getElementById(id).style.display = 'none';
}
// Unhide an element
function unHideElement(id) { 
  if(typeof id === "object")
    id.style.display = 'block';
else
    document.getElementById(id).style.display = 'block';
}


function pageInit() {
  hideElement("frmRegSignature"); 
}


function createTestingVersion() {

  var el = document.getElementsByTagName('h1')[0],
    elChild = document.createElement('h4');
  elChild.innerHTML = 'TESTOVACÍ VERZE !!!';
  // Prepend it
  el.insertBefore(elChild, el.firstChild);

  document.getElementById("childName").value = "Anička Nováková";
  document.getElementById("childPIN").value = "080512/1234";
  document.getElementById("childInsuranceCompany").value = "Hasičská zdravotní pojišťovna";
  document.getElementById("childAddress").value = "Dolní 5, 123 45 Havířov";

  document.getElementById("legalRepName").value = "Anna Nováková";
  document.getElementById("legalRepRelation").value = "Matka";
  document.getElementById("legalRepTel").value = "732003551";
  document.getElementById("legalRepEmail").value = "anna.novakova@gmail.com";
  document.getElementById("legalRep2Name").value = "Josef Novák";
  document.getElementById("legalRep2Relation").value = "Otec";
  document.getElementById("legalRep2Tel").value = "+421732003552";
  document.getElementById("legalRep2Email").value = "josef.novak@gmail.com";

  document.getElementsByName("howAboutEyeSight")[0].checked = true;  
  document.getElementsByName("canBraille")[0].checked = true;
  document.getElementsByName("canWhiteCane")[0].checked = true;
  document.getElementsByName("bringWhiteCane")[0].checked = true;
  document.getElementById("eyesightDetails").value = "bez brýlí toho moc nevidí";
  document.getElementById("movementRestrictionsEyeSight").value = "ne";
  
  document.getElementById("allDrugs").value = "ne";
  document.getElementById("otherAllergiesDetails").value = "ne";
  document.getElementById("foodAllergiesDetails").value = "ne";  
  document.getElementById("otherIllnesses").value = "ne";
  document.getElementById("somethingElseToKnowDetails").value = "ne";
  document.getElementById("doctorContact").value = "Mudr. Jiří Novák, 987 777 554, Havířov";

  document.getElementsByName("bedWetting")[0].checked = true;  
  document.getElementsByName("canSleepInBunkBed")[0].checked = true;
  document.getElementsByName("canSwim")[0].checked = true;
  document.getElementsByName("nightBattleGame")[0].checked = true;
  document.getElementById("childCharacteristics").value = "Anička je super"

  document.getElementsByName("gdprCanPublish")[0].checked = true;  
  document.getElementsByName("gdprCanTag")[0].checked = true;
  
  // removeElement("frmRegChildPersonalData");   
  // removeElement("frmRegContactPersons");
  // removeElement("frmRegEyeSight");
  // removeElement("frmRegHealth");
  // removeElement("frmRegAdditionalInfo");
  // removeElement("frmRegGDPR");
  // removeElement("frmRegSignature");

  // document.querySelector('#frmRegistration').addEventListener('submit', validateForm);
}
 
function printForm() {
  unHideElement("frmRegSignature");
  hideElement("frmRegCheckAndPrint");
  window.print();
  unHideElement("frmRegCheckAndPrint");
  hideElement("frmRegSignature");
}