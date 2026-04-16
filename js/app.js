document.addEventListener('DOMContentLoaded', () => {
    // Timer Init
    const timer = new window.PomodoroTimer();
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const workBtn = document.getElementById('work-btn');
    const breakBtn = document.getElementById('break-btn');
    const modeText = document.getElementById('mode-text');

    startBtn.addEventListener('click', () => {
        timer.isRunning ? timer.pause() : timer.start();
    });

    resetBtn.addEventListener('click', () => timer.reset());

    const updateModeUI = (isWorkMode) => {
        if (isWorkMode) {
            workBtn.classList.add('active'); breakBtn.classList.remove('active');
            modeText.textContent = 'Focus Mode'; modeText.style.color = 'var(--accent-1)';
        } else {
            breakBtn.classList.add('active'); workBtn.classList.remove('active');
            modeText.textContent = 'Relax Mode'; modeText.style.color = 'var(--accent-2)';
        }
    };
    workBtn.addEventListener('click', () => timer.setMode(true, updateModeUI));
    breakBtn.addEventListener('click', () => timer.setMode(false, updateModeUI));

    // Settings Modal
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const apiKeyInput = document.getElementById('api-key-input');

    settingsBtn.addEventListener('click', () => {
        apiKeyInput.value = window.GeminiAPI.getApiKey();
        settingsModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    saveSettingsBtn.addEventListener('click', () => {
        window.GeminiAPI.setApiKey(apiKeyInput.value.trim());
        settingsModal.classList.add('hidden');
        alert("Settings saved!");
    });

    // AI Task Manager
    const aiApi = new window.GeminiAPI();
    const generateBtn = document.getElementById('ai-generate-btn');
    const taskInput = document.getElementById('ai-task-input');
    const taskList = document.getElementById('task-list');
    const aiLoading = document.getElementById('ai-loading');

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-checkbox"></div>
                <span>${task}</span>
            `;
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                const checkbox = li.querySelector('.task-checkbox');
                checkbox.classList.toggle('done');
                if (checkbox.classList.contains('done')) {
                    checkbox.textContent = '✓';
                } else {
                    checkbox.textContent = '';
                }
            });
            taskList.appendChild(li);
        });
    };

    generateBtn.addEventListener('click', async () => {
        const goal = taskInput.value.trim();
        if (!goal) return alert("Please enter a task first!");

        if (!window.GeminiAPI.getApiKey()) {
            return alert("Please enter your Gemini API Key in Settings first.");
        }

        generateBtn.disabled = true;
        aiLoading.classList.remove('hidden');
        taskList.innerHTML = '';

        try {
            const tasks = await aiApi.generateTaskBreakdown(goal);
            renderTasks(tasks);
        } catch (err) {
            console.error("Full error:", err);
            alert(`Detailed Error: ${err.message}`);
        } finally {
            generateBtn.disabled = false;
            aiLoading.classList.add('hidden');
        }
    });
});
