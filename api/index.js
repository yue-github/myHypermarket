import user from '@/api/user';
import test from '@/api/test';
import pay from '@/api/pay';
// 汇集所有api接口函数
let ApiFunList = {
	...user,
	...test,
	...pay
}
/**
 * @param {Object} data
 * @param {Object} callBack
 * 函数导出
 */
// 全量导出
export default ApiFunList;