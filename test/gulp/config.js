var src = './src';
var dest = './build';

module.exports = {
  less: {
    all: src + "/less/**/*.less",  //����less
    src: src + "/less/*.less",	 //��Ҫ�����less
    dest: dest + "/css",	   //���Ŀ¼
    settings: {			//����less������Ҫ�����ã�����Ϊ��
    }
  }
};