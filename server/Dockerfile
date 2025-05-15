FROM python:3.8-slim-bullseye AS builder

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Only copy requirements file first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Final stage
FROM python:3.8-slim-bullseye

WORKDIR /app

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup -s /sbin/nologin appuser && \
    mkdir -p /app && \
    chown appuser:appgroup /app

# Copy only necessary files from builder
COPY --from=builder --chown=appuser:appgroup /usr/local/lib/python3.8/site-packages/ /usr/local/lib/python3.8/site-packages/
COPY --from=builder --chown=appuser:appgroup /usr/local/bin/ /usr/local/bin/

# Create .env file if it doesn't exist
RUN touch .env && chown appuser:appgroup .env

# Copy application code
COPY --chown=appuser:appgroup . .

# Create necessary directories with correct permissions
RUN mkdir -p /app/instance && \
    chown -R appuser:appgroup /app/instance

# Switch to non-root user
USER appuser

# Add health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Expose port
EXPOSE 5000

# Run the application with proper security settings
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app", "--workers", "4", "--timeout", "120", "--worker-class", "gthread", "--threads", "2", "--worker-tmp-dir", "/dev/shm"]
