export default {
	successMessage: function(_this, msg) {

		_this.$message({
			message: msg,
			type: 'success'
		});

	},
	errorMessage: function(_this, error) {

		if(error.response) {
			var errorMsg = error.response.data.message;
			errorMsg = errorMsg.split(error.response.data.exception);
			_this.$message({
				message: '提交失败,由于' + errorMsg[errorMsg.length - 1],
				type: 'error'
			});
		} else if(error.message) {
			_this.$message({
				message: error.message,
				type: 'error'
			});
		} else {
			_this.$message({
				message: '网络异常',
				type: 'error'
			});
		}

	},
	getAxiosPost: function(_this, url, serviceCode, content) {

		return _this.$axios({
			method: 'post',
			url: url,
			crossOrigin: true,
			xhrFields: {
				withCredentials: true
			},
			data: {
				serviceCode: serviceCode,
				token: 'token',
				content: content
			}
		})

	},
	getAxiosPagePost: function(_this, url, serviceCode, content, page, pageSize) {

		return _this.$axios({
			method: 'post',
			url: url,
			crossOrigin: true,
			xhrFields: {
				withCredentials: true
			},
			data: {
				serviceCode: serviceCode,
				token: 'token',
				content: content,
				pageNumber: page,
				pageSize: pageSize,
				isPage: "true"
			}
		})

	},
	getAxiosGet: function(_this, url, serviceCode, content) {

		return _this.$axios({
			method: 'get',
			crossOrigin: true,
			xhrFields: {
				withCredentials: true
			},
			url: url,
			data: {
				serviceCode: serviceCode,
				token: 'token',
				content: content
			}
		})

	},
	formatDate: {

	}

};