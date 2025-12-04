pipeline {
    agent any

    environment {
        // 定义镜像名称
        IMAGE_NAME = "no-oops-front"
        // 定义容器名称
        CONTAINER_NAME = "no-oops-front"
        // 定义对外端口
        APP_PORT = "8088"
    }

    // Add options to handle the Git checkout issue
    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Prepare Environment') {
            steps {
                sh '''
                    #!/bin/bash
                    
                    echo "=== Configuring Git for Unstable Network ==="
                    
                    # Fix Git SSL/TLS issues
                    git config --global http.sslverify false
                    git config --global https.sslverify false
                    
                    # Increase buffer size for large transfers
                    git config --global http.postBuffer 524288000
                    
                    # Configure timeouts
                    git config --global http.lowSpeedLimit 0
                    git config --global http.lowSpeedTime 999999
                    
                    # Use HTTPS instead of Git protocol
                    git config --global url.https://.insteadOf git://
                    
                    # Additional Git configurations for better reliability
                    git config --global core.longpaths true
                    git config --global core.autocrlf false
                    
                    echo "Git configuration completed"
                '''
            }
        }
        
        stage('Checkout') {
            steps {
                script {
                    // Retry mechanism for Git checkout
                    def retryCount = 3
                    def success = false
                    
                    for (int i = 0; i < retryCount && !success; i++) {
                        try {
                            echo "尝试第 ${i + 1} 次拉取代码..."
                            // 拉取 GitHub 代码，分支为 release
                            checkout scmGit(
                                branches: [[name: '*/release']], 
                                userRemoteConfigs: [[url: 'https://github.com/cs7eric/no_oops.git']],
                                extensions: [
                                    [$class: 'CloneOption', shallow: true, timeout: 30],
                                    [$class: 'CleanBeforeCheckout'],
                                    [$class: 'RelativeTargetDirectory', relativeTargetDir: '.']
                                ]
                            )
                            success = true
                        } catch (Exception e) {
                            echo "第 ${i + 1} 次尝试失败: ${e.getMessage()}"
                            if (i < retryCount - 1) {
                                echo "等待 10 秒后重试..."
                                sleep 10
                            }
                        }
                    }
                    
                    if (!success) {
                        error "Git checkout failed after ${retryCount} attempts"
                    }
                }
            }
        }

        stage('Show Source Files') {
            steps {
                sh '''
                    echo "=== Showing current directory structure ==="
                    pwd
                    ls -la
                    
                    echo "=== Showing package.json ==="
                    cat package.json
                    
                    echo "=== Showing build script ==="
                    grep "build" package.json
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '正在构建 Docker 镜像...'
                    // 使用 Build 号作为 Tag，方便回滚
                    sh "echo '=== Building Docker image with BUILD_NUMBER: ${BUILD_NUMBER} ==='"
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                    sh "echo '=== Building Docker image with latest tag ==='"
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                    
                    // 检查镜像是否创建成功
                    sh "echo '=== Checking created images ==='"
                    sh "docker images | grep ${IMAGE_NAME}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo '正在部署...'
                    
                    // 检查当前运行的容器
                    sh "echo '=== Checking currently running containers ==='"
                    sh "docker ps | grep ${CONTAINER_NAME} || echo 'No running containers with name ${CONTAINER_NAME}'"
                    
                    // 检查端口占用情况
                    sh "echo '=== Checking port ${APP_PORT} usage ==='"
                    sh "lsof -i :${APP_PORT} | grep LISTEN || echo 'No process listening on port ${APP_PORT}'"
                    
                    // 1. 杀掉占用端口的进程
                    sh "lsof -i :${APP_PORT} | grep LISTEN | awk '{print \$2}' | xargs kill -9 || true"
                    
                    // 2. 停止旧容器 (如果存在)
                    sh "echo '=== Stopping old container ==='"
                    sh "docker ps -q --filter name=${CONTAINER_NAME} | xargs -r docker stop || echo 'No container to stop'"
                    
                    // 3. 删除旧容器 (如果存在)
                    sh "echo '=== Removing old container ==='"
                    sh "docker ps -aq --filter name=${CONTAINER_NAME} | xargs -r docker rm || echo 'No container to remove'"
                    
                    // 4. 运行新容器
                    sh "echo '=== Running new container ==='"
                    sh "docker run -d -u root -p ${APP_PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
                    
                    // 5. 检查容器是否运行成功
                    sh "echo '=== Checking container status ==='"
                    sh "sleep 5"
                    sh "docker ps | grep ${CONTAINER_NAME}"
                    
                    // 6. 检查容器日志
                    sh "echo '=== Checking container logs ==='"
                    sh "docker logs ${CONTAINER_NAME} || echo 'Failed to get container logs'"
                }
            }
        }
    }
    
    post {
        always {
            // 清理工作空间，节省磁盘
            cleanWs()
        }
        success {
            echo '构建并部署成功！'
            sh "echo '=== Final verification ==='"
            sh "curl -I http://localhost:${APP_PORT} || echo 'Failed to connect to deployed application'"
        }
        failure {
            echo '构建失败，请检查日志。'
            sh "echo '=== Debugging information on failure ==='"
            sh "docker ps -a | grep ${CONTAINER_NAME} || echo 'No container found'"
            sh "docker images | grep ${IMAGE_NAME} || echo 'No image found'"
        }
    }
}