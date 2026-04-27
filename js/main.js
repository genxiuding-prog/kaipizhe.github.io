/**
 * 开辟者科技官网 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileNav();
    initTabs();
    initScrollAnimations();
    initContactForm();
    initParticles();
});

/**
 * 移动端导航菜单
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击菜单项后关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 滚动时隐藏/显示导航栏
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Tab 切换功能
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 添加活动状态
            button.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 动画完成后停止观察
                if (entry.target.classList.contains('fade-in')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.capability-card, .case-card, .value-card, .tech-card, .solution-card, .pain-point-card, .product-block').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * 联系表单处理
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 收集表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // 简单验证
        if (!data.name || !data.phone || !data.email || !data.message) {
            showAlert('请填写所有必填项', 'error');
            return;
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showAlert('请输入有效的邮箱地址', 'error');
            return;
        }

        // 模拟提交
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showAlert('感谢您的留言！我们会尽快与您联系。', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/**
 * 显示提示消息
 */
function showAlert(message, type = 'info') {
    // 移除已存在的提示
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert-message alert-${type}`;
    alert.textContent = message;

    // 样式
    Object.assign(alert.style, {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '16px 32px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        zIndex: '9999',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        animation: 'slideDown 0.3s ease',
        backgroundColor: type === 'success' ? '#00c896' : type === 'error' ? '#ff4757' : '#0066ff',
        color: '#fff'
    });

    document.body.appendChild(alert);

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 3 秒后移除
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

/**
 * 粒子效果
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // 随机位置和大小
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 3 + 2;

        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
        });

        particlesContainer.appendChild(particle);
    }

    // 添加彩色漂浮粒子
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9400d3', '#ff00ff'];
    for (let i = 0; i < 15; i++) {
        const colorParticle = document.createElement('div');
        colorParticle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            filter: blur(2px);
            animation: colorFloat ${6 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;
        particlesContainer.appendChild(colorParticle);
    }
}

/**
 * 平滑滚动到锚点
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * 数字滚动动画
 */
function animateNumbers() {
    const counters = document.querySelectorAll('.metric-value');

    counters.forEach(counter => {
        const target = counter.textContent;
        const hasPercent = target.includes('%');
        const number = parseInt(target.replace(/[^0-9]/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                counter.textContent = hasPercent ? `${number}%` : number.toString();
                clearInterval(timer);
            } else {
                counter.textContent = hasPercent ? `${Math.floor(current)}%` : Math.floor(current).toString();
            }
        }, 30);
    });
}

// 当数字指标进入视口时触发
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metrics-section').forEach(section => {
    metricsObserver.observe(section);
});
