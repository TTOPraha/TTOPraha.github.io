let page = {};

// na ostré verzi změnit na false
page.testVersion = true;
page.dateOfCampStart = new Date(2020, 6, 12);
page.minYearOfBirth = 1981; // Tomáš Hnízdil :)

window.onload = () => {
  page.init();
  if (page.testVersion) page.createTestingVersion();
};

page.init = async () => {
  document.querySelector('main').style.display = 'block';
  document.querySelector('#frmRegistration').addEventListener('submit', page.sendApplication);
  document.querySelector('#testPrint').addEventListener('click', page.printTestVersion);
  document.querySelector('#clearForSibling').addEventListener('click', page.clearForSiblingEntry);
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

page.fillDateOfBirth = () => {

};

page.sendApplication = () => {
  let formElement = document.querySelector("#frmRegistration");
  let formData = page.formToJSON(formElement);
  console.log(formData);

  let dateOfBirth = page.getDateOfBirthFromRC(formData.diteRC);
  if (!dateOfBirth) {
    alert('Rodné číslo není ve správném formátu');
    return;
  } 
  let age = page.getAge(page.dateOfCampStart, dateOfBirth);
    
  document.querySelector('#diteDatumNarozeni').value = page.convertDate(dateOfBirth);
  document.querySelector('#diteVek').value = age;

  let xhr = new XMLHttpRequest();
  let url = "../zpracuj.php";
  if (page.testVersion) url = "../zpracuj.php";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) page.printForm();
    if (xhr.readyState === 4 && xhr.status !== 200 && page.testVersion) page.printForm();

  };
  xhr.send(formData);

};

page.forward = async () => {
  window.scrollTo(0, 0);
  // případně přesměrovat na info/homepage? 
  // window.location.replace("podzimky2019.html");
  setTimeout(() => {
    alert("Přihláška byla v pořádku odeslána.\nProsím vyčkejte na potvrzující e-mail");
  }, 50);
};

page.createTestingVersion = () => {
  page.testVersion = true;
  const loremIpsum = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.";

  // 2
  document.getElementsByName("diteJmeno")[0].value = "TEST Anička Nováková TEST";
  document.getElementsByName("diteRC")[0].value = "055729/1234";
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
  document.getElementsByName("chodiSBilouHoli")[0].checked = true;
  document.getElementsByName("budeMitBilouHul")[0].checked = true;
  document.getElementsByName("zrakDetaily")[0].value = loremIpsum;
  document.getElementsByName("omezeniSkrZrakVadu")[0].value = 'Nemá';

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

page.clearForSiblingEntry = () => {
  // document.getElementById("myForm").reset()

  // 2
  document.getElementsByName("diteJmeno")[0].value = "";
  document.getElementsByName("diteRC")[0].value = "";
  document.getElementsByName("diteZTPP")[0].value = "";

  // 4
  document.getElementsByName("jakDiteVidi")[0].checked = false;
  document.getElementsByName("umiBraille")[0].checked = false;
  document.getElementsByName("chodiSBilouHoli")[0].checked = false;
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


page.formToJSON = function (form) {
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
  return jsonOutput;
};

page.getDateOfBirthFromRC = function (rc = '') {
  try {

    let year = parseInt(rc.substring(0, 2), 10);
    let thisYear = new Date().getFullYear() - 2000;
    if (year <= thisYear) year += 2000;
    else year += 1900;
    if (year < page.minYearOfBirth) return false;

    let month = parseInt(rc.substring(2, 4), 10);
    if (month >= 50) month -= 50;
    if (month > 12 || month < 1) return false;
    month -= 1;

    let day = parseInt(rc.substring(4, 6), 10);
    if (day < 1 || day > 31) return false;

    return new Date(year, month, day);
  } catch (e) {
    return false;
  }
};

page.getAge = function (date, dateOfBirth) {
  var diff_ms = date - dateOfBirth.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

// https://www.zizka.ch/pages/programming/ruzne/rodne-cislo-identifikacni-cislo-rc-ico-kontrola-validace.html
page.testRC = function(x, age) {
  if (!age) age = 0;
  try {
    if (x.length == 0) return true;
    if (x.length < 9) throw 1;
    var year = parseInt(x.substr(0, 2), 10);
    var month = parseInt(x.substr(2, 2), 10);
    var day = parseInt(x.substr(4, 2), 10);
    var ext = parseInt(x.substr(6, 3), 10);
    if ((x.length == 9) && (year < 54)) return true;
    var c = 0;
    if (x.length == 10) c = parseInt(x.substr(9, 1));
    var m = parseInt(x.substr(0, 9)) % 11;
    if (m == 10) m = 0;
    if (m != c) throw 1;
    year += (year < 54) ? 2000 : 1900;
    if ((month > 70) && (year > 2003)) month -= 70;
    else if (month > 50) month -= 50;
    else if ((month > 20) && (year > 2003)) month -= 20;
    var d = new Date();
    if ((year + age) > d.getFullYear()) throw 1;
    if (month == 0) throw 1;
    if (month > 12) throw 1;
    if (day == 0) throw 1;
    if (day > 31) throw 1;
  }
  catch (e) {
    return false;
  }
  return true;
};

page.convertDate = function (inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.')
};