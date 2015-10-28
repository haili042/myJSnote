/**
 * Created by Administrator on 2015/8/5.
 */

/***
 * 求二叉树最深深度
 * @param val
 * @constructor
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
};
var root = new TreeNode(0);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.left.right = new TreeNode(6);


var maxDepth = function(root) {
    if(root == null){
        return;
    }

};
console.log(maxDepth(root));

