// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // 显示指定幻灯片
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 自动播放
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // 停止自动播放
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 事件监听
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    // 点击指示点切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // 鼠标悬停时停止自动播放
    const banner = document.querySelector('.banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopSlideShow);
        banner.addEventListener('mouseleave', startSlideShow);
    }

    // 开始自动播放
    startSlideShow();
});

// 语言切换
const languageSelect = document.querySelector('.language-switch select');
languageSelect.addEventListener('change', (e) => {
    // 这里可以添加语言切换的逻辑
    console.log('Language changed to:', e.target.value);
});

// 新闻分类切换功能
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.news-category-btn');
    const newsItems = document.querySelectorAll('.news-item');

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按钮的active类
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // 为当前点击的按钮添加active类
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                // 显示/隐藏新闻项
                newsItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// 新闻订阅表单处理
const subscriptionForm = document.querySelector('.subscription-form');
if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        // 这里可以添加邮箱验证逻辑
        if (email) {
            // 模拟订阅成功
            alert('订阅成功！感谢您的关注。');
            emailInput.value = '';
        }
    });
}

// 联系表单处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // 这里可以添加表单验证逻辑
        if (validateForm(formData)) {
            // 模拟表单提交
            submitForm(formData);
        }
    });
}

// 表单验证函数
function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]{8,}$/;

    // 验证姓名
    if (!data.name.trim()) {
        showError('name', '请输入您的姓名');
        isValid = false;
    }

    // 验证邮箱
    if (!emailRegex.test(data.email)) {
        showError('email', '请输入有效的电子邮箱地址');
        isValid = false;
    }

    // 验证电话
    if (!phoneRegex.test(data.phone)) {
        showError('phone', '请输入有效的电话号码');
        isValid = false;
    }

    // 验证主题
    if (!data.subject) {
        showError('subject', '请选择咨询主题');
        isValid = false;
    }

    // 验证留言内容
    if (!data.message.trim()) {
        showError('message', '请输入留言内容');
        isValid = false;
    }

    return isValid;
}

// 显示错误信息
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // 移除已存在的错误信息
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
}

// 提交表单
function submitForm(data) {
    // 这里可以添加实际的表单提交逻辑，例如发送到服务器
    console.log('提交的表单数据:', data);
    
    // 模拟提交成功
    alert('感谢您的留言，我们会尽快与您联系！');
    
    // 重置表单
    contactForm.reset();
    
    // 移除所有错误提示
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// 滚动动画效果
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// 图片悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image');
    const newsImages = document.querySelectorAll('.news-image');

    function addImageHoverEffect(images) {
        images.forEach(image => {
            const img = image.querySelector('img');
            if (img) {
                image.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                });
                image.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    }

    addImageHoverEffect(productImages);
    addImageHoverEffect(newsImages);
});

// 按钮动画效果
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-more, .btn-view-all, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
});

// 导航栏交互优化
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav ul li a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        // 高亮当前页面链接
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
        
        // 添加悬停效果
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});

// 产品Banner轮播
function initProductBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots .dot');
    const prevBtn = document.querySelector('.product-banner .prev-btn');
    const nextBtn = document.querySelector('.product-banner .next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 自动轮播
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 事件监听
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // 鼠标悬停时暂停轮播
    const banner = document.querySelector('.product-banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopSlideShow);
        banner.addEventListener('mouseleave', startSlideShow);
    }

    // 开始自动轮播
    startSlideShow();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initProductBanner();
});

// 产品分类筛选功能
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productItems = document.querySelectorAll('.product-item');

    // 为每个分类按钮添加点击事件
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // 显示/隐藏产品
            productItems.forEach(item => {
                if (selectedCategory === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === selectedCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}); 