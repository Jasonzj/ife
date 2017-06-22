/*
 * @Author: Jason 
 * @Date: 2017-06-22 15:07:38 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-22 16:23:39
 */

;(() => {

    const getData = (() => {
        const cityData = {
            "珠海" : ["暨南大学", "广东科学技术职业学校", "珠海城市职业学校"],
            "广州" : ["广州外语学院", "广州天河学院", "广州新东方"],
            "深圳" : ["深圳职业学校", "深圳科学学院", "深圳大学"]
        }
        
        const showSchool = (val, school) => {
            school.innerHTML = ''
            for (let i = 0, str; str = cityData[val][i++];) {
                const option = document.createElement('option')
                option.innerHTML = str
                school.appendChild(option)
            }
        }

        return {
            showSchool
        }

    })();

    const schoolForm = document.querySelector('.schoolForm')
        selects = document.getElementsByClassName('select-box')
        school = document.querySelector('#school')
        city = document.querySelector('#city')
        radios = schoolForm.schoolRadio
    
    schoolForm.addEventListener('change', function(e) {
        const target = e.target
            state = target.getAttribute('data') // 当前选中状态对应类名
            current = document.querySelector('.' + state);  // 根据类名查找到当前要切换的元素

        switch (state) {
            case 'inSchool':
            case 'outSchool':
                [].forEach.call(selects, item => item.removeClass('show'))
                current.addClass('show')
                break
        }
    })

    // 监听城市变化
    city.addEventListener('change', function(e) {
        getData.showSchool(e.target.value, school)
    })

})()

/* 
 * 给Element对象添加操作class的方法
 */
Element.prototype.hasClass = function (str) {
    return this.className.match(new RegExp('(\\s|^)' + str + '(\\s|$)'));
}

Element.prototype.addClass = function (str) {
    if (!this.hasClass(str)) this.className += " " + str;
}

Element.prototype.removeClass = function (str) {
    if (this.hasClass(str)) {
        var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
        this.className = this.className.replace(reg, '');
    }
}