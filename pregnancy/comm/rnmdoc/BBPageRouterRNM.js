'use strict';


let BBPageRouterRNM = {

    /**
     * 提供ReactNative模块pop操作，方便ReactNative最外层的视图进行退出操作
     * @return {promise} then(null => {}) 成功会执行resolve 失败会执行reject
     */
    popModule() {},


    /**
     * 弹出登陆页
     * @return {promise} then(null => {}) 登录成功会执行resolve 失败会执行reject
     */
    showLoginPage() {},


    /**
     * Umeng分享
     * @param  {object} req
     *     {
     *      "shareUrl":shareUrl,//分享的跳转页面地址 不能为空
     *      "title":title,//分享的标题 不能为空
     *      "content":content,//分享的内容简介 可以为空
     *      "imageUrl": imageUrl//分享的小图地址 不能为空
     *     }
     * @return {promise} then(null => {}) 分享成功会执行resolve 失败会执行reject
     */
    shareOpen(req) {},


    /**
     * 跳转页面
     * @param {object} req
     *     {
     *      "url": url,//要跳转的页面地址 不能为空
     *      "title": title//跳转页面的标题 可以为空
     *     }
     * @return {promise} then(null => {}) 跳转成功会执行resolve 失败会执行reject
     */
    showPage(req) {},


    /**
     * Scheme跳转
     * @param {object} req
     *     {
     *      "scheme": scheme,//scheme的名称
     *     }
     * @return {promise} then(null => {}) Scheme跳转成功会执行resolve 失败会执行reject
     */
    schemeOpen(req) {},


    /**
     * 选择图片or拍照选择图片，图片会直接上传到文件服务器，同时返回文件id
     * @param {object} req
     *   {
     *     "sessionId": "ask" // 本次会话id，不能为空;(比如问答页上传图片可以传“ask”,随便定义)
     *     "number": "5" //图片数量， 取值范围 1~10；其他值或不传默认为1;
     *   }
     * @return {promise} then(res => {}) 成功会执行resolve 失败会执行reject
     * res.data.photoJsonStr是字符串，转为对象后是个数组，数组的每一项是一个file的信息，参考后面示例。
     * res示例：
     * {
    "status":"success",
	"data": {
		"sessionId":"ask"
		"photoJsonStr": [{
				  "photo_id": "435482064",

				  "thumb_info": {
						    "smallfit": {
							"photo_url": "http://pic03.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_sf.jpg",
							"height": "75",
							"width": "100"
						    },
						    "middlesquare": {
							"photo_url": "http://pic02.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_sm.jpg",
							"height": "200",
							"width": "200"
						    },
						    "middlebig": {
							"photo_url": "http://pic02.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_mb.jpg",
							"height": "480",
							"width": "640"
						    },
						    "smallsquare": {
							"photo_url": "http://pic01.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_ss.jpg",
							"height": "100",
							"width": "100"
						    },
						    "big1600": {
							"photo_url": "http://pic04.babytreeimg.com/foto3/photos/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_b1600.jpg",
							"height": "480",
							"width": "640"
						    },
						    "newbig": {
							"photo_url": "http://pic01.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_nb.jpg",
							"height": "480",
							"width": "640"
						    },
						    "big": {
							"photo_url": "http://pic03.babytreeimg.com/foto3/photos/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_b.jpg",
							"height": "480",
							"width": "640"
						    },
						    "middle": {
							"photo_url": "http://pic05.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_m.jpg",
							"height": "360",
							"width": "480"
						    },
						    "smallheadsquare": {
							"photo_url": "http://pic02.babytreeimg.com/foto3/thumbs/2016/0325/70/3/c9aa1b333f3a4d44bcdcc04d_hs.jpg",
							"height": "49",
							"width": "49"
						    }
					    }
				  }
			   ],
	       }
     */
    choosePhoto(req) {},

}