
var l1 = read_line();
var l2 = read_line();

a(l1, l2);

function a(txt, parternTxt) {
    var pt = /<[a-zA-Z0-9]+>/gi;
    var txtMatch = txt.match(pt) || [];
    var parternMatch = parternTxt.match(pt) || [];
    var root = parternMatch.shift();
    var res = '', count = 0, fa = {}, ch = {}, last = txtMatch.length;

    var ch = parternMatch.join('');


    for (var i = txtMatch.length - 1; i >= 0; i--) {
        if (root == txtMatch[i]) {

            var pa = '';
            for (var x = i ; x <= last; x++) {
                pa += txtMatch[x];
            }

            if (pa.indexOf(ch) > 0) {
                res = (i+1) + ' ' + res;
                count++;
            }

            last = i;

        }
    }
    print(count);
    print(res);
}

