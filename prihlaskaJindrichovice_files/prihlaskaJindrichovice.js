let page = {};

// na ostré verzi změnit na false
page.testVersion = true;

window.onload = () => {
  page.init();
  if (page.testVersion) page.createTestingVersion();
};

page.init = async function () {
  document.querySelector('main').style.display = 'block';
  document.querySelector('#frmRegistration').addEventListener('submit', page.sendApplication);
  document.querySelector('#testPrint').addEventListener('click', page.printTestVersion);
  document.querySelector('#clearForSibling').addEventListener('click', page.clearForSiblingEntry);
  
  document.querySelector('#turnOnJSWarning').style.display = 'none';
};

page.printTestVersion = () => {
  page.createTestingVersion();
  page.resizeTextAreas();
  document.querySelector('#frmRegSignature').style.display = 'block';
  document.querySelector('#submitForm').style.display = 'none';
  document.querySelector('#clearForSibling').style.display = 'none';
  window.print();
  document.location.reload();
  document.querySelector('#submitForm').style.display = 'inline';
  document.querySelector('#clearForSibling').style.display = 'inline';
};

page.printForm = () => {
  page.resizeTextAreas();
  document.querySelector('#frmRegSignature').style.display = 'block';
  document.querySelector('#submitForm').style.display = 'none';
  document.querySelector('#clearForSibling').style.display = 'none';
  window.print();
  document.querySelector('#frmRegSignature').style.display = 'none';
  document.querySelector('#submitForm').style.display = 'inline';
  document.querySelector('#clearForSibling').style.display = 'inline';

};

page.resizeTextAreas = () => {
  const textAreas = document.querySelectorAll('textarea');
  const l = textAreas.length;
        
  for (let i = 0; i < l; i++) {
    const tArea = textAreas[i];
    tArea.style.cssText = "overflow:hidden";
    tArea.style.cssText = 'height:auto; padding:0';
    tArea.style.cssText = 'height:' + (tArea.scrollHeight + 10) + 'px';
  }
};

page.sendApplication = function () {
  console.log('submit');
  let formElement = document.querySelector("#frmRegistration");
  let formData = page.rormToJSON(formElement);
  // console.log(formData);

  let xhr = new XMLHttpRequest();
  let url = "url";

  //test
  if ( url==="url" && page.testVersion) url = "http://localhost:3000/application";

  //// Věk v době tábora ////

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) page.forward();
  };
  xhr.send(formData);
  page.printForm();
  // if (page.testVersion) page.forward();
};

page.forward = async function () {
  window.scrollTo(0, 0);
  // případně přesměrovat na info/homepage? 
  // window.location.replace("podzimky2019.html");
  setTimeout(() => {
    alert("Přihláška byla v pořádku odeslána.\nProsím vyčkejte na potvrzující e-mail");
  }, 50);
};

page.createTestingVersion = function () {
  page.testVersion = true;
  const loremIpsum = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.";

  // 2
  document.getElementsByName("diteJmeno")[0].value = "TEST Anička Nováková TEST";
  document.getElementsByName("diteRC")[0].value = "080512/1234";
  document.getElementsByName("diteZTPP")[0].value = "123456";
  document.getElementsByName("ditePojistovna")[0].value = "Hasičská zdravotní pojišťovna";
  document.getElementsByName("diteadresa")[0].value = "Dolní 5, 123 45 Havířov";
  // 3
  document.getElementsByName("zakZastJmeno")[0].value = "Anna Nováková";
  document.getElementsByName("zakZastVztah")[0].value = "Matka";
  document.getElementsByName("zakZasTel")[0].value = "732003551";
  document.getElementsByName("zakZasEmail")[0].value = "anna.novakova@gmail.com";

  document.getElementsByName("zakZast2Jmeno")[0].value = "Josef Novák";
  document.getElementsByName("zakZast2Vztah")[0].value = "Otec";
  document.getElementsByName("zakZast2Tel")[0].value = "+421732003552";
  document.getElementsByName("zakZast2Email")[0].value = "josef.novak@gmail.com";

  document.getElementsByName("kontakt3Jmeno")[0].value = "Karel Novák";
  document.getElementsByName("kontakt3Vztah")[0].value = "Děda";
  document.getElementsByName("kontakt3Tel")[0].value = "+421799003552";
  document.getElementsByName("kontakt3Email")[0].value = "karel.novak@gmail.com";

  // 4
  document.getElementsByName("jakDiteVidi")[0].checked = true;
  document.getElementsByName("umiBraille")[0].checked = true;
  document.getElementsByName("umiSBilouHoli")[0].checked = true;
  document.getElementsByName("budeMitBilouHul")[0].checked = true;
  document.getElementsByName("zrakDetaily")[0].value = loremIpsum;
  document.getElementsByName("omezeniSkrZrakVadu")[0].value = loremIpsum;

  // 5
  document.getElementsByName("uzivaneLeky")[0].value = loremIpsum;
  document.getElementsByName("alergie")[1].checked = "true";
  document.getElementsByName("alergie")[2].checked = "true";
  document.getElementsByName("ostatniAlergieDetaily")[0].value = loremIpsum;
  document.getElementsByName("zakazanePotraviny")[0].value = loremIpsum;
  document.getElementsByName("nemoci")[0].checked = "true";
  document.getElementsByName("nemoci")[1].checked = "true";
  document.getElementsByName("nemoci")[4].checked = "true";

  document.getElementsByName("pomocovani")[1].checked = true;
  document.getElementsByName("epilepsieDetaily")[0].value = loremIpsum;
  document.getElementsByName("ostatniNemoci")[0].value = loremIpsum;
  document.getElementsByName("jesteNecoBychomMeliVedet")[0].value = loremIpsum;
  document.getElementsByName("doktorKontakt")[0].value = "Mudr. Novák Josef, Havířov, 406 615 211";
 
  // 6
  document.getElementsByName("muzeSpatNaPatrovePosteli")[1].checked = true;
  document.getElementsByName("umiPlavat")[1].checked = true;
  document.getElementsByName("nocniHra")[0].checked = true;
  document.getElementsByName("childCharacteristics")[0].value = loremIpsum;

  // 7
  document.getElementsByName("gdprSouhlasSeZverejnenim")[0].checked = true;
  document.getElementsByName("gdprSouhlasSOznacenim")[1].checked = true;
  document.getElementsByName("gdprZpracovaniUdaju")[0].checked = true;

  // 8
  document.getElementsByName("zavaznePrihlasuji")[0].checked = true;
  document.getElementsByName("udajePravdive")[0].checked = true;
  document.getElementsByName("diteJeZpusobile")[0].checked = true;
};

page.clearForSiblingEntry = function () {
  // document.getElementById("myForm").reset()

  // 2
  document.getElementsByName("diteJmeno")[0].value = "";
  document.getElementsByName("diteRC")[0].value = "";
  document.getElementsByName("diteZTPP")[0].value = "";

  // 4
  document.getElementsByName("jakDiteVidi")[0].checked = false;
  document.getElementsByName("umiBraille")[0].checked = false;
  document.getElementsByName("umiSBilouHoli")[0].checked = false;
  document.getElementsByName("budeMitBilouHul")[0].checked = false;
  document.getElementsByName("zrakDetaily")[0].value = "";
  document.getElementsByName("omezeniSkrZrakVadu")[0].value = "";

  // 5
  document.getElementsByName("uzivaneLeky")[0].value = "";
  document.getElementsByName("alergie")[1].checked = false;
  document.getElementsByName("alergie")[2].checked = false;
  document.getElementsByName("ostatniAlergieDetaily")[0].value = "";
  document.getElementsByName("zakazanePotraviny")[0].value = "";
  document.getElementsByName("nemoci")[0].checked = false;
  document.getElementsByName("nemoci")[1].checked = false;
  document.getElementsByName("nemoci")[4].checked = false;

  document.getElementsByName("pomocovani")[1].checked = false;
  document.getElementsByName("epilepsieDetaily")[0].value = "";
  document.getElementsByName("ostatniNemoci")[0].value = "";
  document.getElementsByName("jesteNecoBychomMeliVedet")[0].value = "";
 
  // 6
  document.getElementsByName("muzeSpatNaPatrovePosteli")[1].checked = false;
  document.getElementsByName("umiPlavat")[1].checked = false;
  document.getElementsByName("nocniHra")[0].checked = false;
  document.getElementsByName("childCharacteristics")[0].value = "";
};


page.rormToJSON = function (form) {
  let jsonOutput = {};
  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i++) {

    let field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    let val = field.value;
    let name = field.name;

    if (field.type === 'radio') {
      if (field.checked) jsonOutput[name] = val;
    }

    else if (field.type === 'checkbox') {
      jsonOutput[val] = (field.checked === true) ? 'ANO' : 'Ne';
    }

    else {
      jsonOutput[name] = val;
    }
  }
  return JSON.stringify(jsonOutput, null, 2);
};

