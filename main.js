function decode_url() {
  var source = document.getElementById("ppdecode_input");
  var dest = document.getElementById("ppdecode_output");

  if (!source) {
    alert("Cannot find source textarea with id 'encoded'.");
    return false;
  }
  if (!dest) {
    alert("Cannot find target <p> with id 'decoded'.");
    return false;
  }

  var full_url = source.value;

  var find_re = /.+?u=(.+?)(&.*)?$/;
  var matches = find_re.exec(full_url);
  if (matches) {
    var defended = matches[1];
    var with_slashes = defended.replace(/_/g, "/"); // Regex with g flag to get all
    var defenseless = de_hex(with_slashes);

    dest.textContent = defenseless;
    dest.setAttribute("href", defenseless);
    // var element = document.getElementById("ppdecode_output");
    dest.classList.add("success");
  } else {
    dest.textContent = full_url;
    dest.setAttribute("href", full_url);
    // var element = document.getElementById("ppdecode_output");
    dest.classList.add("success");
  }

  return false;
}

function de_hex(hexed) {
  var result = hexed;
  var hex_re = /(.*)(-)([0-9A-F][0-9A-F])(.*)/;
  var hexmatches = hex_re.exec(hexed);

  while (hexmatches && hexmatches.index !== null) {
    var character = String.fromCharCode(parseInt(hexmatches[3], 16));
    result = hexmatches[1] + character + hexmatches[4];

    hexmatches = hex_re.exec(result);
  }
  return result;
}
