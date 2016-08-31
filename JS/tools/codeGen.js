
var cityNum =
`A5105
A5115
A5109
A5107
A5132
A5120
A5113
A5104
A5134
A5116
A5114
A5111
A51A1
A5117
A5101
A5103
A5106
A5110
A5108
A5133
A5118
A5119`;


var city =
`泸州
宜宾
遂宁
绵阳
阿坝
资阳
南充
攀枝花
凉山
广安
眉山
乐山
省公司本部
达州
成都
自贡
德阳
内江
广元
甘孜
雅安
巴中`;

var areaId =
`0830
0831
0825
0816
0837
028Z
0817
0812
0834
0826
028m
0833

0818
028
0813
0838
0832
0839
0836
0835
0827`;

var sx =
`lz
yb
sn
my
ab
zy
nc
pzh
liangs
ga
ms
les

dz
cd
zg
dy
nj
gy
gz
ya
bz`;

var user =
`lzadmin
ybadmin
snadmin
myadmin
abadmin
zyadmin
ncadmin
pzhadmin
lsadmin
gaadmin
msadmin
lesadmin
sadmin
dzadmin
cdadmin
zgadmin
dyadmin
njadmin
gyadmin
gzadmin
yaadmin
bzadmin`;

var cityNumArr = cityNum.split('\n');
var cityArr = city.split('\n');
var areaIdArr = areaId.split('\n');
var sxArr = sx.split('\n');
var userArr = user.split('\n');

var result = [];
var resultStr = '';

var patternStr = '';
cityNumArr.forEach( (v, i) => {
    result.push({
        index: i,
        cityNumber: v,
        city: cityArr[i],
        areaId: areaIdArr[i],
        selected: false,
    });

    resultStr += `{ _index: ${i}, _city: '${cityArr[i]}', _cityNumber: '${v}', _areaId: '${areaIdArr[i]}', _selected: false, _sx: '${sxArr[i]}', _user: '${userArr[i]}' },\n`;
    patternStr +=`${cityArr[i]}|`;
});

console.log('[' + resultStr + ']');
console.log('[' + patternStr + ']');